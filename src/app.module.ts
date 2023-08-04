import { Module } from '@nestjs/common';
import { NoteModule } from './model/note/note.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      //insert password here
      'mongodb+srv://artemonlypnyk:PASSWORD@testcluster.fc8u0ci.mongodb.net/task3Notes?retryWrites=true&w=majority',
    ),
    NoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
