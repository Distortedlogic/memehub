import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { NodeColumns } from '../../common/columns/node';

@ObjectType()
@Entity('users')
export class UserEntity extends NodeColumns {
  @Field()
  @Column({ name: 'first_name' })
  firstName: string;

  @Field()
  @Column({ name: 'last_name' })
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field(() => Boolean)
  @Column({ default: false, name: 'email_verified' })
  emailVerified: boolean;

  @Column()
  password: string;

  @Field(() => String)
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', name: 'last_login' })
  lastLogin: Date;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @Field({ nullable: true })
  @Column('uuid', { name: 'avatar_id', nullable: true })
  avatarId?: string;
}
