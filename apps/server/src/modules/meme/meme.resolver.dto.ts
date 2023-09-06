import { ObjectType } from '@nestjs/graphql';
import { CreatePDTO } from '../../../../core/generics/pagination.g';
import { MemeEntity } from './entities/meme.entity';

@ObjectType()
export class MemePDTO extends CreatePDTO(MemeEntity) {}
