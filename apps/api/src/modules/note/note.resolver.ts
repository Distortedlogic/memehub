import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPassport } from '../../decorators/userPassport';
import { BasicAuthGuard } from '../../guards/BasicAuthGuard';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { NoteCreateArgs } from './args/NoteCreateArgs';
import { NoteIdArg } from './args/NoteIdArg';
import { NoteSearchArgs } from './args/NoteSearchArgs';
import { NoteUpdateArgs } from './args/NoteUpdateArgs';
import { NoteEntity } from './note.entity';

@Resolver(NoteEntity)
@UseGuards(BasicAuthGuard)
export class NoteResolver {
  constructor(@InjectRepository(NoteEntity) public readonly repo: Repository<NoteEntity>) {}

  @Query(() => [NoteEntity])
  getNotes(@Args() { clientId, skip, take }: NoteSearchArgs): Promise<NoteEntity[]> {
    return this.repo.find({ where: { clientId }, skip, take });
  }

  @Query(() => NoteEntity)
  getNote(@Args() { noteId }: NoteIdArg) {
    return this.repo.findOneByOrFail({ id: noteId });
  }

  @Mutation(() => NoteEntity)
  createNote(@UserPassport() { firmId }: IUserPassport, @Args() { clientId, note, workspaceId }: NoteCreateArgs) {
    return this.repo.save(
      this.repo.create({
        firmId: firmId,
        clientId: clientId,
        note: note,
        workspaceId: workspaceId,
      }),
    );
  }

  @Mutation(() => NoteEntity)
  async updateNote(@Args() { noteId, note }: NoteUpdateArgs) {
    const noteEntity = await this.repo.findOneByOrFail({ id: noteId });
    noteEntity.note = note;
    return this.repo.save(noteEntity);
  }

  @Mutation(() => NoteEntity)
  async deleteNote(@Args() { noteId }: NoteIdArg) {
    const note = await this.repo.findOneByOrFail({ id: noteId });
    await this.repo.delete(noteId);
    return note;
  }
}
