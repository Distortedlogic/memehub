import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import bcrypt, { compare } from 'bcryptjs';
import CryptoJS from 'crypto-js';
import { serverEnvironment } from '../../config/services/server.config';

@Injectable()
export class EncryptionService {
  constructor(
    @Inject(serverEnvironment.KEY)
    private readonly serverEnv: ConfigType<typeof serverEnvironment>,
  ) {}

  consistentHash(text: string) {
    return CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex);
  }

  encrypt(text: string): string {
    if (this.serverEnv.isLocal || this.serverEnv.isDev) return text;
    return CryptoJS.AES.encrypt(text, this.serverEnv.secret).toString();
  }

  decrypt(encryptedText: string): string {
    if (this.serverEnv.isLocal || this.serverEnv.isDev) return encryptedText;
    return CryptoJS.AES.decrypt(encryptedText, this.serverEnv.secret).toString(CryptoJS.enc.Utf8);
  }

  async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, await bcrypt.genSalt());
  }

  async compare(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }
}
