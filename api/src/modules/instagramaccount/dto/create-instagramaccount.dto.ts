import { IsString, Min } from 'class-validator';

export class CreateInstagramAccountDto {
  @IsString()
  readonly username: string;
  @IsString()
  @Min(4)
  readonly password: string;
}
