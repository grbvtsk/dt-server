import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from '../../src/recipe/recipe.controller';
import { RecipeService } from '../../src/recipe/recipe.service';
import { GetRecipesDto } from '../../src/recipe/dto/get-recipes.dto';

describe('RecipeController', () => {
  let controller: RecipeController;
  let service: RecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        {
          provide: RecipeService,
          useValue: {
            getRecipes: jest.fn(),
            getRecipeInfo: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RecipeController>(RecipeController);
    service = module.get<RecipeService>(RecipeService);
  });

  it('should return a list of recipes using service.getRecipes()', async () => {
    const dto: GetRecipesDto = { category: 'Seafood' };
    const mockData = { meals: [{ idMeal: '1', strMeal: 'Grilled Salmon' }] };

    jest.spyOn(service, 'getRecipes').mockResolvedValueOnce(mockData);

    const result = await controller.getRecipes(dto);

    expect(result).toEqual(mockData);
    expect(service.getRecipes).toHaveBeenCalledWith(dto);
  });

  it('should return recipe info using service.getRecipeInfo()', async () => {
    const mockData = { meals: [{ idMeal: '52772', strMeal: 'Beef Stew' }] };

    jest.spyOn(service, 'getRecipeInfo').mockResolvedValueOnce(mockData);

    const result = await controller.getRecipeInfo('52772');

    expect(result).toEqual(mockData);
    expect(service.getRecipeInfo).toHaveBeenCalledWith('52772');
  });
});
