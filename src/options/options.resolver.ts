import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { OptionsService } from './options.service';
import { Option, OptionType } from './entities/option.entity';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => Option)
export class OptionsResolver {
  constructor(private readonly optionsService: OptionsService) {}

  @Mutation(() => Option)
  async createOption(@Args('data') data: CreateOptionInput) {
    try {
      const res = await this.optionsService.create(data);
      return res;
    } catch (error) {
      console.error('ffffffffffffffff');
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
  }

  @Query(() => [Option], { name: 'options' })
  findAll(@Args('optionType', { type: () => String }) optionType: OptionType) {
    return this.optionsService.findAll(optionType);
  }

  @Query(() => Option, { name: 'option' })
  findOne(
    @Args('id', { type: () => Int }) id: string,
    @Args('optionType', { type: () => String }) optionType: OptionType,
  ) {
    return this.optionsService.findOne(id, optionType);
  }

  @Mutation(() => Option)
  updateOption(@Args('data') data: UpdateOptionInput) {
    return this.optionsService.update(data);
  }

  @Mutation(() => Option)
  removeOption(
    @Args('id', { type: () => ID }) id: string,
    @Args('optionType', { type: () => String }) optionType: OptionType,
  ) {
    return this.optionsService.remove(id, optionType);
  }
}
