import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class BcryptAdapter {
  async hash(plaintext: string): Promise<string> {
    return await hash(plaintext, 8);
  }

  async compare(plaintext: string, hash: string): Promise<boolean> {
    return await compare(plaintext, hash);
  }
}
