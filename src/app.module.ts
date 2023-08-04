import { Module } from '@nestjs/common';
import { NoteModule } from './model/note/note.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://artemonlypnyk:E4ZRzbv4zPy6iSeF@testcluster.fc8u0ci.mongodb.net/task3Notes?retryWrites=true&w=majority',
    ),
    NoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
