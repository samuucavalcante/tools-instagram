import { IsString, Min } from 'class-validator';

export class CreateInstagramAccountDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
}
