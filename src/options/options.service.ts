import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import {
  Type,
  Status,
  Format,
  Genre,
  Tag,
  OptionType,
  TranslateStatus,
} from './entities/option.entity';

@Injectable()
export class OptionsService {
  OptionRepository: any;
  constructor(
    @InjectRepository(Type) private typeRepository: Repository<Type>,
    @InjectRepository(Status) private statusRepository: Repository<Status>,
    @InjectRepository(TranslateStatus)
    private translateStatusRepository: Repository<TranslateStatus>,
    @InjectRepository(Format) private formatRepository: Repository<Format>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
  ) {
    this.OptionRepository = {
      Type: this.typeRepository,
      Status: this.statusRepository,
      Format: this.formatRepository,
      Genre: this.genreRepository,
      Tag: this.tagRepository,
      TranslateStatus: this.translateStatusRepository,
    };
  }

  create(data: CreateOptionInput) {
    if (this.OptionRepository[data.option_type]) {
      return this.OptionRepository[data.option_type].save(data);
    }
    throw new HttpException('option type not found', HttpStatus.NOT_FOUND);
  }

  findAll(optionType: OptionType): Promise<Array<any>> {
    if (this.OptionRepository[optionType]) {
      return this.OptionRepository[optionType].find();
    }
    throw new HttpException('option type not found', HttpStatus.NOT_FOUND);
  }

  findOne(id: string, optionType: OptionType): Promise<any> {
    if (this.OptionRepository[optionType]) {
      return this.OptionRepository[optionType].findOne(id);
    }
    throw new HttpException('option type not found', HttpStatus.NOT_FOUND);
  }

  async update(data: UpdateOptionInput): Promise<Genre> {
    if (!this.OptionRepository[data.option_type]) {
      throw new HttpException('option type not found', HttpStatus.NOT_FOUND);
    }
    const option = await this.OptionRepository[data.option_type].findOne(
      data.id,
    );
    if (option) {
      return await this.OptionRepository[data.option_type].save(data);
    }
    throw new HttpException('not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: string, optionType: OptionType) {
    if (!this.OptionRepository[optionType]) {
      throw new HttpException('option type not found', HttpStatus.NOT_FOUND);
    }
    const option = await this.OptionRepository[optionType].findOne(id);
    if (option) {
      await this.OptionRepository[optionType].delete(id);
      return option;
    }
    throw new HttpException('not found', HttpStatus.NOT_FOUND);
  }
}
