import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LieuService } from './lieu.service';
import { CreateLieuDto } from './dto/create-lieu.dto';
import { UpdateLieuDto } from './dto/update-lieu.dto';

@Controller('lieu')
export class LieuController {
  constructor(private readonly lieuService: LieuService) {}

  @Post()
  create(@Body() createLieuDto: CreateLieuDto) {
    return this.lieuService.create(createLieuDto);
  }

  @Get()
  findAll() {
    return this.lieuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lieuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLieuDto: UpdateLieuDto) {
    return this.lieuService.update(+id, updateLieuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lieuService.remove(+id);
  }
}
