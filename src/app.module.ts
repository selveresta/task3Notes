import { Module } from '@nestjs/common';
import { NoteModule } from './model/note/note.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Note } from './model/note/note.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [Note],
      autoLoadModels: true,
      synchronize: true,
    }),
    NoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
