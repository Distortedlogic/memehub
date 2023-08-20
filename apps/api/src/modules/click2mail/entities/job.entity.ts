import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { NodeColumns } from '../../abstracts/node.columns';

@ObjectType()
@Entity('job')
export class JobEntity extends NodeColumns {
  @Field()
  @Column({ name: 'document_class' })
  documentClass: string;

  @Field()
  @Column()
  layout: string;

  @Field()
  @Column({ name: 'production_time' })
  productionTime: string;

  @Field()
  @Column()
  envelope: string;

  @Field()
  @Column()
  color: string;

  @Field()
  @Column({ name: 'paper_type' })
  paperType: string;

  @Field()
  @Column({ name: 'print_option' })
  printOption: string;

  @Field()
  @Column({ name: 'document_id' })
  documentId: string;

  @Field()
  @Column({ name: 'address_id' })
  addressId: string;

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
