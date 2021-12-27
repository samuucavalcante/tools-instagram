import { Injectable } from '@nestjs/common';
import * as bcript from 'bcryptjs';

@Injectable()
export class BcriptService {
  async hashPassword(password: string) {
    return await bcript.hash(password, 10);
  }

  async validatePassword(password: string, hash: string) {
    return await bcript.compare(password, hash);
  }
}
