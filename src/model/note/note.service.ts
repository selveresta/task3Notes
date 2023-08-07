import { Injectable } from '@nestjs/common';
import { E_Category, Note } from './note.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNoteDto } from './dto/create-note-dto';
import { EditNoteDto } from './dto/edit-note-dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note)
    private noteModel: typeof Note,
  ) {
    const gRS = (length) => {
      let result = '';
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
        counter += 1;
      }
      return result;
    };
    for (let i = 0; i < 7; i++) {
      const categ = Math.floor(Math.random() * (3 - 1 + 1) + 1);
      const note = {
        name: `Name${i}`,
        archived: i % 2 === 0 ? true : false,
        category:
          categ === 1
            ? E_Category.Idea
            : categ === 2
            ? E_Category.Task
            : categ === 3
            ? E_Category.RandomThought
            : E_Category.Idea,
        content: gRS(30),
        date: new Date(Date.now()),
      };
      noteModel.create(note);
    }
  }

  async getAll() {
    return await this.noteModel.findAll();
  }

  async getOne(id: number) {
    return await this.noteModel.findOne({ where: { id } });
  }

  async getStats() {
    const notes = await this.noteModel.findAll();
    const result = [];
    for (const key in E_Category) {
      const element = E_Category[key];
      const activeNotesCount = notes.filter(
        (note) => note.category === element && note.archived === false,
      ).length;
      const archivedNotesCount = notes.filter(
        (note) => note.category === element && note.archived,
      ).length;
      result.push({
        name: element,
        active: activeNotesCount,
        archive: archivedNotesCount,
      });
    }
    return result;
  }

  async createNote(createNoteDto: CreateNoteDto) {
    const note = {
      name: createNoteDto.name,
      category: createNoteDto.category,
      content: createNoteDto.content,
      date: new Date(Date.now()),
      archived: false,
    };
    return await this.noteModel.create(note);
  }

  async deleteNote(id: number) {
    const note = await this.getOne(id);
    await note.destroy();
  }

  async editNote(id: number, editNoteDto: EditNoteDto) {
    const note = await this.getOne(id);
    note.set({
      name: editNoteDto.name,
      category: editNoteDto.category,
      content: editNoteDto.content,
      archived: editNoteDto.archived,
    });
    return await note.save();
  }
}
