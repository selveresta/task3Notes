import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note-dto';
import { EditNoteDto } from './dto/edit-note-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Note } from './note.model';

@ApiTags('Notes')
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @ApiOperation({ summary: 'Get all Notes' })
  @ApiResponse({ status: 200, type: [Note] })
  @Get()
  async getAll() {
    return this.noteService.getAll();
  }

  @ApiOperation({ summary: 'Get aggregated data statistics' })
  @ApiResponse({ status: 200 })
  @Get('stats')
  async getStats() {
    return await this.noteService.getStats();
  }

  @ApiOperation({ summary: 'Create one new note' })
  @ApiResponse({ status: 200, type: Note })
  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.createNote(createNoteDto);
  }

  @ApiOperation({ summary: 'Delete Note by Id' })
  @ApiResponse({ status: 200, type: Note })
  @Delete(':id')
  async deleteNote(@Param('id', ParseIntPipe) id: number) {
    return this.noteService.deleteNote(id);
  }

  @ApiOperation({ summary: 'Get Note by Id' })
  @ApiResponse({ status: 200, type: Note })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.noteService.getOne(id);
  }

  @ApiOperation({ summary: 'Edit Note by Id' })
  @ApiResponse({ status: 200, type: Note })
  @Patch(':id')
  async editNote(
    @Param('id', ParseIntPipe) id: number,
    @Body() editNoteDto: EditNoteDto,
  ) {
    return this.noteService.editNote(id, editNoteDto);
  }
}
