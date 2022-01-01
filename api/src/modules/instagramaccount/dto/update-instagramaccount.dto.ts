import { PartialType } from '@nestjs/mapped-types';
import { CreateOrUpdateInstagramAccountDto } from './create-instagramaccount.dto';

export class UpdateInstagramaccountDto extends PartialType(
  CreateOrUpdateInstagramAccountDto,
) {}
