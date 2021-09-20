import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opinions } from './entities/opinions.entity';
import { OpinionsService } from './opinions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Opinions])],
  providers: [OpinionsService],
  exports: [OpinionsService],
})
export class OpinionsModule {}
