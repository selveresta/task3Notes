import { E_Category } from '../note.model';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CreateNoteDto } from './create-note-dto';
import { ApiProperty } from '@nestjs/swagger';

export class EditNoteDto extends CreateNoteDto {
  @ApiProperty({ example: 'false', description: 'Is archived Note or not' })
  @IsNotEmpty()
  @IsBoolean()
  readonly archived: boolean;
}
