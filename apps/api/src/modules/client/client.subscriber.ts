import { Injectable } from '@nestjs/common';
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { EncryptionService } from '../encryption/encryption.service';
import { ClientEntity } from './client.entity';

@EventSubscriber()
@Injectable()
export class ClientSubscriber implements EntitySubscriberInterface<ClientEntity> {
  constructor(dataSource: DataSource, private readonly encryptionService: EncryptionService) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return ClientEntity;
  }

  private readonly propertiesToEncrypt = ['name', 'description', 'objective'] as const;

  beforeInsert({ entity }: InsertEvent<ClientEntity>): void {
    for (const prop of this.propertiesToEncrypt) {
      if (entity[prop]) {
        entity[prop] = this.encryptionService.encrypt(entity[prop]);
      }
    }
  }

  /* beforeUpdate({ databaseEntity }: UpdateEvent<ClientEntity>): void {
    if (databaseEntity) {
      for (const prop of this.propertiesToEncrypt) {
        if (databaseEntity[prop]) {
          databaseEntity[prop] = this.encryptionService.encrypt(databaseEntity[prop]);
        }
      }
    }
  } */

  afterLoad(entity: ClientEntity): void {
    for (const prop of this.propertiesToEncrypt) {
      if (entity[prop]) {
        entity[prop] = this.encryptionService.decrypt(entity[prop]);
      }
    }
  }
}
