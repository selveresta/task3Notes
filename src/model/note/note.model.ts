import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum E_Category {
  Task = 'Task',
  Idea = 'Idea',
  RandomThought = 'Random Thought',
}

@Table
export class Note extends Model {
  @ApiProperty({ example: 'My Note', description: 'Name of Note' })
  @Column
  name: string;

  @ApiProperty({ example: 'I need to go shop', description: 'Content of Note' })
  @Column
  content: string;

  @ApiProperty({ example: '23.01.2003', description: 'Date created' })
  @Column
  date: Date;

  @ApiProperty({ example: 'Task | Idea', description: 'Category of Note' })
  @Column({ type: DataType.ENUM(...Object.values(E_Category)) })
  category: E_Category;

  @ApiProperty({ example: 'false', description: 'Is archived Note or not' })
  @Column({ defaultValue: false })
  archived: boolean;
}
