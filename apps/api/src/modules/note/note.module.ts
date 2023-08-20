import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './note.entity';
import { NoteResolver } from './note.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  providers: [NoteResolver],
  exports: [],
})
export class NoteModule {}
