import { IsString, Min } from 'class-validator';

export class CreateOrUpdateInstagramAccountDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
}
