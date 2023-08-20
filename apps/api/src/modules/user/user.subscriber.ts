import { Injectable } from '@nestjs/common';
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { EncryptionService } from '../encryption/encryption.service';
import { UserEntity } from './entities/user.entity';

@EventSubscriber()
@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  constructor(private readonly dataSource: DataSource, private readonly encryptionService: EncryptionService) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return UserEntity;
  }

  async beforeInsert({ entity }: InsertEvent<UserEntity>): Promise<void> {
    entity['password'] = await this.encryptionService.encryptPassword(entity['password']);
  }

  async beforeUpdate({ entity }: UpdateEvent<UserEntity>): Promise<void> {
    if (entity && entity['password']) {
      entity['password'] = await this.encryptionService.encryptPassword(entity['password']);
    }
  }
}
