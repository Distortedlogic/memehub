import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { NodeColumns } from '../../abstracts/node.columns';

@ObjectType()
@Entity('click2mail_document')
export class click2mailDocumentEntity extends NodeColumns {
  @Field()
  @Column({ name: 'file_url' })
  fileUrl: string;

  @Field()
  @Column({ name: 'document_format' })
  documentFormat: string;

  @Field()
  @Column({ name: 'document_name' })
  documentName: string;

  @Field()
  @Column({ name: 'document_class' })
  documentClass: string;
}
