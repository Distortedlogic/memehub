import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class FakerService {
  private readonly logger = new Logger(FakerService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async clearDb() {
    await this.userRepo.delete({});
  }

  async seedDb() {
    this.logger.log('Clearing DB');
    await this.clearDb();
  }
}
