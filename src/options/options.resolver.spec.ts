import { Test, TestingModule } from '@nestjs/testing';
import { OptionsResolver } from './options.resolver';
import { OptionsService } from './options.service';

describe('OptionsResolver', () => {
  let resolver: OptionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionsResolver, OptionsService],
    }).compile();

    resolver = module.get<OptionsResolver>(OptionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
