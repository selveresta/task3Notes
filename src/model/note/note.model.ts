import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum E_Category {
  Task = 'Task',
  Idea = 'Idea',
  RandomThought = 'Random Thought',
}

export type CatDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @ApiProperty({ example: 'My Note', description: 'Name of Note' })
  @Prop()
  name: string;

  @ApiProperty({ example: 'I need to go shop', description: 'Content of Note' })
  @Prop()
  content: string;

  @ApiProperty({ example: '23.01.2003', description: 'Date created' })
  @Prop()
  date: Date;

  @ApiProperty({ example: 'Task | Idea', description: 'Category of Note' })
  @Prop({ type: String, enum: E_Category, default: E_Category.Task })
  category: E_Category;

  @ApiProperty({ example: 'false', description: 'Is archived Note or not' })
  @Prop()
  archived: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
