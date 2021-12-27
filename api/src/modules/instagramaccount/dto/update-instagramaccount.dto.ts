import { PartialType } from '@nestjs/mapped-types';
import { CreateInstagramAccountDto } from './create-instagramaccount.dto';

export class UpdateInstagramaccountDto extends PartialType(
  CreateInstagramAccountDto,
) {}
