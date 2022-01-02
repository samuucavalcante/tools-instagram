import { IntagramAccount } from '@prisma/client';
import { CreateOrUpdateInstagramAccountDto } from '../dto/create-instagramaccount.dto';
export interface IInstagramAccountRepository {
  create(
    id: string,
    createInstagramAccountDto: CreateOrUpdateInstagramAccountDto,
  );
  update(
    id: string,
    dto: CreateOrUpdateInstagramAccountDto,
  ): Promise<IntagramAccount>;

  getInstagramAccountsByUser(id: string): Promise<IntagramAccount[]>;
}
