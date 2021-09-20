import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsResolver } from './options.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Type,
  Status,
  Format,
  Genre,
  Tag,
  TranslateStatus,
} from './entities/option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Type,
      Status,
      TranslateStatus,
      Format,
      Genre,
      Tag,
    ]),
  ],
  providers: [OptionsResolver, OptionsService],
})
export class OptionsModule {}
