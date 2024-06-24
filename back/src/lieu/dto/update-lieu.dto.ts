import { PartialType } from '@nestjs/mapped-types';
import { CreateLieuDto } from './create-lieu.dto';

export class UpdateLieuDto extends PartialType(CreateLieuDto) {}
