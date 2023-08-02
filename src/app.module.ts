import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from './db/typeorm.module';
import { NoteModule } from './model/note/note.module';

@Module({
  imports: [TypeOrmModule, NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
