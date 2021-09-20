import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opinions } from './entities/opinions.entity';

@Injectable()
export class OpinionsService {
  constructor(
    @InjectRepository(Opinions)
    private opinionsRepository: Repository<Opinions>,
  ) {}
  async create(): Promise<Opinions> {
    return await this.opinionsRepository.save({});
  }
  async remove(id: string): Promise<Opinions> {
    const opinions = await this.opinionsRepository.findOne(id);
    if (opinions) {
      await this.opinionsRepository.delete(id);
      return opinions;
    }
    return null;
  }
}
