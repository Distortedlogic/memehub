import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicAuthGuard } from '../../guards/BasicAuthGuard';
import { CongressCalendarItemArgs } from './args/CongressCalendarItemArgs';
import { CongressCalendarItemIdArgs } from './args/CongressCalendarItemIdArgs';
import { CongressCalendarItemEntity } from './congress.calendar.entity';

@Resolver(CongressCalendarItemEntity)
export class CongressCalendarItemResolver {
  constructor(
    @InjectRepository(CongressCalendarItemEntity)
    private readonly congressCalendarItemRepo: Repository<CongressCalendarItemEntity>,
  ) {}

  @Query(() => [CongressCalendarItemEntity])
  @UseGuards(BasicAuthGuard)
  getCongressCalendar(): Promise<CongressCalendarItemEntity[]> {
    return this.congressCalendarItemRepo.find();
  }

  @Mutation(() => CongressCalendarItemEntity)
  createCongressCalendarItem(@Args() args: CongressCalendarItemArgs) {
    return this.congressCalendarItemRepo.save(args);
  }

  @Mutation(() => String)
  async deleteCongressCalendarItem(@Args() { congressCalendarItemId }: CongressCalendarItemIdArgs) {
    await this.congressCalendarItemRepo.delete({ id: congressCalendarItemId });
    return congressCalendarItemId;
  }

  @Mutation(() => CongressCalendarItemEntity)
  async updateCongressCalendarItem(@Args() { congressCalendarItemId }: CongressCalendarItemIdArgs, @Args() args: CongressCalendarItemArgs) {
    await this.congressCalendarItemRepo.update(congressCalendarItemId, args);
    return this.congressCalendarItemRepo.findOneBy({ id: congressCalendarItemId });
  }
}
