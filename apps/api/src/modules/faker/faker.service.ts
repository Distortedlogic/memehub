import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { random, sample, sampleSize, times } from 'lodash';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { AddressEntity } from '../address/address.entity';
import { CongressCalendarItemEntity } from '../calendar/congress.calendar.entity';
import { ClientEntity } from '../client/client.entity';
import { CompletionEntity, CompletionLogEntity } from '../completion/completion.entity';
import { DocumentEntity } from '../document/document.entity';
import { FirmEntity } from '../firm/entities/firm.entity';
import { WorkspaceToUserEntity } from '../joins/workspace-user.entity';
import { NoteEntity } from '../note/note.entity';
import { PromptEntity } from '../prompt/prompt.entity';
import { ETaskStatus } from '../task/enums/ETaskStatus';
import { TaskEntity } from '../task/task.entity';
import { timezoneMapping } from '../timezone/timezoneMapping';
import { LOBBY_MATIC_DUMMY_FIRM_ID, UserEntity } from '../user/entities/user.entity';
import { EFirmPermission } from '../user/enums/EFirmPermission';
import { ELobbymaticPermission } from '../user/enums/ELobbymaticPermission';
import { WorkspaceEntity } from '../workspace/workspace.entity';
import { fakeClients } from './data/clients';
import { congressCalendar } from './data/congress-calendar';
import { fakeFirms } from './data/firms';
import { fakeNotes } from './data/notes';
import { promptData } from './data/prompts';
import { fakeTasks } from './data/tasks';
import { fakeWorkspaces } from './data/workspace';

@Injectable()
export class FakerService {
  private readonly logger = new Logger(FakerService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepo: Repository<ClientEntity>,
    @InjectRepository(FirmEntity)
    private readonly firmRepo: Repository<FirmEntity>,
    @InjectRepository(WorkspaceEntity)
    private readonly workspaceRepo: Repository<WorkspaceEntity>,
    @InjectRepository(WorkspaceToUserEntity)
    private readonly firmToWorkspaceToUserRepo: Repository<WorkspaceToUserEntity>,
    @InjectRepository(NoteEntity)
    private readonly noteRepo: Repository<NoteEntity>,
    @InjectRepository(CongressCalendarItemEntity)
    private readonly congressCalendarItemRepo: Repository<CongressCalendarItemEntity>,
    @InjectRepository(PromptEntity)
    private readonly promptRepo: Repository<PromptEntity>,
    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,
    @InjectRepository(CompletionEntity)
    private readonly completionRepo: Repository<CompletionEntity>,
    @InjectRepository(CompletionLogEntity)
    private readonly completionLogRepo: Repository<CompletionLogEntity>,
    @InjectRepository(DocumentEntity)
    private readonly documentRepo: Repository<DocumentEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepo: Repository<AddressEntity>,
  ) {}

  async clearDb() {
    await this.firmRepo.delete({});
    await this.userRepo.delete({});
    await this.workspaceRepo.delete({});
    await this.firmToWorkspaceToUserRepo.delete({});
    await this.clientRepo.delete({});
    await this.promptRepo.delete({});
    await this.taskRepo.delete({});
    await this.noteRepo.delete({});
    await this.congressCalendarItemRepo.delete({});
    await this.completionRepo.delete({});
    await this.completionLogRepo.delete({});
    await this.documentRepo.delete({});
  }

  async seedDb() {
    this.logger.log('Clearing DB');
    await this.clearDb();
    this.logger.log('Seeding Lobbymatic Users');
    await this.createUsers({ firmId: LOBBY_MATIC_DUMMY_FIRM_ID, hostname: 'lobbymatic', isLobbymatic: true });
    this.logger.log('Seeding Congress Calendar');
    await this.congressCalendarItemRepo.save(congressCalendar);
    this.logger.log('Seeding Prompts');
    await this.promptRepo.save(promptData);

    for (const firm of fakeFirms) {
      this.logger.log(`Seeding Firm ${firm.name}`);
      this.logger.log('Seeding Firm Address');
      const address = await this.addressRepo.save({
        address: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        address3: '',
        city: faker.location.city(),
        country: faker.location.countryCode(),
        phone: faker.phone.number(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
      });
      const firmEntity = await this.firmRepo.save({ ...firm, addressId: address.id });
      this.logger.log('Seeding Firm Users');
      const firmUsers = await this.createUsers({ firmId: firmEntity.id, hostname: firm.name.replace(' ', ''), isLobbymatic: false });
      const permissionToUsers: Record<EFirmPermission, UserEntity[]> = {
        [EFirmPermission.Admin]: [],
        [EFirmPermission.Manager]: [],
        [EFirmPermission.Editor]: [],
        [EFirmPermission.Viewer]: [],
      };
      for (const user of firmUsers) {
        permissionToUsers[user.firmPermission!].push(user);
      }
      this.logger.log('Seeding Firm Workspaces');
      for (const workspace of sampleSize(fakeWorkspaces, 5)) {
        const workspaceId = v4();
        await this.workspaceRepo.save({ ...workspace, id: workspaceId, firmId: firmEntity.id });
        await this.firmToWorkspaceToUserRepo.save(
          permissionToUsers[EFirmPermission.Admin].map((user) => ({ firmId: firmEntity.id, userId: user.id, workspaceId })),
        );
        await this.firmToWorkspaceToUserRepo.save(
          permissionToUsers[EFirmPermission.Manager].map((user) => ({ firmId: firmEntity.id, userId: user.id, workspaceId })),
        );
        await this.firmToWorkspaceToUserRepo.save(
          sampleSize(permissionToUsers[EFirmPermission.Editor], 2).map((user) => ({ firmId: firmEntity.id, userId: user.id, workspaceId })),
        );
        await this.firmToWorkspaceToUserRepo.save(
          sampleSize(permissionToUsers[EFirmPermission.Viewer], 2).map((user) => ({ firmId: firmEntity.id, userId: user.id, workspaceId })),
        );
        for (const client of sampleSize(fakeClients, 3)) {
          const clientId = v4();
          await this.clientRepo.save({ id: clientId, ...client, workspaceId, firmId: firmEntity.id });
          await this.noteRepo.save(sampleSize(fakeNotes, 2).map(({ note }) => ({ note, clientId, workspaceId, firmId: firmEntity.id })));
          await this.taskRepo.save(
            sampleSize(fakeTasks, 20).map(({ description, objective }) => ({
              objective,
              description,
              status: sample(Object.values(ETaskStatus)),
              dueDate: dayjs().add(random(1, 30), 'days').startOf('day'),
              clientId,
              workspaceId,
              firmId: firmEntity.id,
            })),
          );
        }
      }
    }
  }

  createUsers({ firmId, hostname, isLobbymatic }: { isLobbymatic: boolean; hostname: string; firmId: string }) {
    const timezones = Object.keys(timezoneMapping);
    return this.userRepo.save(
      [
        {
          email: `admin@${hostname}.com`,
          firmPermission: isLobbymatic ? undefined : EFirmPermission.Admin,
          lobbymaticPermission: isLobbymatic ? ELobbymaticPermission.Admin : undefined,
        },
        ...times(2, (idx) => ({
          email: `manager${idx}@${hostname}.com`,
          firmPermission: isLobbymatic ? undefined : EFirmPermission.Manager,
          lobbymaticPermission: isLobbymatic ? ELobbymaticPermission.Manager : undefined,
        })),
        ...times(5, (idx) => ({
          email: `editor${idx}@${hostname}.com`,
          firmPermission: isLobbymatic ? undefined : EFirmPermission.Editor,
          lobbymaticPermission: isLobbymatic ? ELobbymaticPermission.Editor : undefined,
        })),
        ...times(10, (idx) => ({
          email: `viewer${idx}@${hostname}.com`,
          firmPermission: isLobbymatic ? undefined : EFirmPermission.Viewer,
          lobbymaticPermission: isLobbymatic ? ELobbymaticPermission.Viewer : undefined,
        })),
      ].map(({ email, firmPermission, lobbymaticPermission }) => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email,
        emailVerified: true,
        password: 'password',
        firmPermission,
        lobbymaticPermission,
        firmId,
        timezone: sample(timezones),
      })),
    );
  }
}
