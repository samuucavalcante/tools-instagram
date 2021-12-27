import { CreateInstagramAccountDto } from '../dto/create-instagramaccount.dto';
export interface IInstagramAccountRepository {
  create(id: string, createInstagramAccountDto: CreateInstagramAccountDto);
}
