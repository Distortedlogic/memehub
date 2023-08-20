import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { NodeColumns } from '../../abstracts/node.columns';

@ObjectType()
@Entity('job_logs')
export class JobLogEntity extends NodeColumns {
  @Field()
  @Column({ name: 'job_id' })
  jobId: string;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column({ name: 'status_url' })
  statusUrl: string;

  @Field()
  @Column()
  description: string;
}
