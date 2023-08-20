import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';
import { ECongressCalendarItemType } from './enums/ECongressCalendarItemType';

@ObjectType()
@Entity('congress_calendar_items')
export class CongressCalendarItemEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Field(() => ECongressCalendarItemType)
  @Column({ type: 'enum', enum: ECongressCalendarItemType })
  type: ECongressCalendarItemType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  holiday: string;

  @Field(() => String)
  @Column({
    type: 'timestamp with time zone',
    nullable: false,
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return value.toISOString();
      },
    },
  })
  date: string;
}
