import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { serverEnvironment } from '../../config/services/server.config';
import { AddressEntity } from '../address/address.entity';
import { CongressCalendarItemEntity } from '../calendar/congress.calendar.entity';
import { ClientEntity } from '../client/client.entity';
import { CompletionEntity, CompletionLogEntity } from '../completion/completion.entity';
import { DocumentEntity } from '../document/document.entity';
import { FirmEntity } from '../firm/entities/firm.entity';
import { WorkspaceToUserEntity } from '../joins/workspace-user.entity';
import { NoteEntity } from '../note/note.entity';
import { PromptEntity } from '../prompt/prompt.entity';
import { TaskEntity } from '../task/task.entity';
import { UserEntity } from '../user/entities/user.entity';
import { WorkspaceEntity } from '../workspace/workspace.entity';
import { DbCommand } from './commands/db';
import { DbSeedCommand } from './commands/subcommands/seed';
import { FakerService } from './faker.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ClientEntity,
      FirmEntity,
      WorkspaceEntity,
      WorkspaceToUserEntity,
      NoteEntity,
      TaskEntity,
      CongressCalendarItemEntity,
      PromptEntity,
      CompletionEntity,
      CompletionLogEntity,
      DocumentEntity,
      AddressEntity,
    ]),
    ConfigModule.forRoot({ load: [serverEnvironment] }),
  ],
  providers: [FakerService, DbSeedCommand, DbCommand],
  exports: [],
})
export class FakerModule {}
