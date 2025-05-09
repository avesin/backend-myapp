import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class UpdateInterestsDto {
  @IsArray()
  @ArrayNotEmpty()
  values: string[];
}