import { Injectable } from '@nestjs/common';
import { CreateLieuDto } from './dto/create-lieu.dto';
import { UpdateLieuDto } from './dto/update-lieu.dto';

@Injectable()
export class LieuService {
  create(createLieuDto: CreateLieuDto) {
    return 'This action adds a new lieu';
  }

  findAll() {
    return `This action returns all lieu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lieu`;
  }

  update(id: number, updateLieuDto: UpdateLieuDto) {
    return `This action updates a #${id} lieu`;
  }

  remove(id: number) {
    return `This action removes a #${id} lieu`;
  }
}
