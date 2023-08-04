import { Injectable } from '@nestjs/common';
import { E_Category, Note } from './note.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note-dto';
import { EditNoteDto } from './dto/edit-note-dto';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {
    // const gRS = (length) => {
    //   let result = '';
    //   const characters =
    //     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //   const charactersLength = characters.length;
    //   let counter = 0;
    //   while (counter < length) {
    //     result += characters.charAt(
    //       Math.floor(Math.random() * charactersLength),
    //     );
    //     counter += 1;
    //   }
    //   return result;
    // };
    // for (let i = 0; i < 7; i++) {
    //   const categ = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    //   const note: Note = {
    //     name: `Name${i}`,
    //     archived: i % 2 === 0 ? true : false,
    //     category:
    //       categ === 1
    //         ? E_Category.Idea
    //         : categ === 2
    //         ? E_Category.Task
    //         : categ === 3
    //         ? E_Category.RandomThought
    //         : E_Category.Idea,
    //     content: gRS(30),
    //
    //   };
    //   noteModel.create(note);
    // }
  }

  async getAll() {
    return this.noteModel.find().exec();
  }

  async getOne(id: string) {
    return await this.noteModel.findById(id);
  }

  async getStats() {
    const notes = await this.noteModel.find().exec();
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
    const schema: Note = {
      name: createNoteDto.name,
      category: createNoteDto.category,
      content: createNoteDto.content,
      date: new Date(Date.now()),
      archived: false,
    };
    return this.noteModel.create(schema);
  }

  async deleteNote(id: string) {
    return await this.noteModel.findByIdAndDelete(id);
  }

  async editNote(id: string, editNoteDto: EditNoteDto) {
    const updated = await this.noteModel.findByIdAndUpdate(id, {
      $set: {
        name: editNoteDto.name,
        category: editNoteDto.category,
        content: editNoteDto.content,
        archived: editNoteDto.archived,
      },
    });
    return updated;
  }
}
