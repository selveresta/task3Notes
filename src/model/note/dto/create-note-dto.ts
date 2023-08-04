import { ApiProperty } from '@nestjs/swagger';
import { E_Category } from '../note.model';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 'My Note', description: 'Name of Note' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty({
    example: 'Task | Idea | Random Throught',
    description: 'Category of Note',
  })
  @IsNotEmpty()
  @IsEnum(E_Category)
  readonly category: E_Category;
  @ApiProperty({ example: 'I need to go shop', description: 'Content of Note' })
  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
