import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Manga } from 'src/manga/entities/manga.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum OptionType {
  TYPE = 'Type',
  FEMALE = 'Status',
  FORMAT = 'Format',
  GENRE = 'Genre',
  TAG = 'Tag',
  TRANSLATE_STATUS = 'TranslateStatus',
}

@ObjectType()
export class Option {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Field()
  @Column({ nullable: false, unique: true })
  option_name: string;
  @Field({
    description:
      'enum <Type | Status  | TranslateStatus | Format | Genre | Tag>',
  })
  option_type: OptionType;
}

@ObjectType()
@Entity('type')
export class Type extends Option {
  @OneToMany(() => Manga, (manga) => manga.type)
  mangaList: Manga[];
}

@ObjectType()
@Entity('status')
export class Status extends Option {
  @OneToMany(() => Manga, (manga) => manga.status)
  mangaList: Manga[];
}

@ObjectType()
@Entity('translateStatus')
export class TranslateStatus extends Option {
  @OneToMany(() => Manga, (manga) => manga.status)
  mangaList: Manga[];
}

@ObjectType()
@Entity('format')
export class Format extends Option {}

@ObjectType()
@Entity('genre')
export class Genre extends Option {}

@ObjectType()
@Entity('tag')
export class Tag extends Option {}
