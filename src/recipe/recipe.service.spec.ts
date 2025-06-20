import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from '../../src/recipe/recipe.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse, AxiosHeaders } from 'axios';
import { ConfigService } from '@nestjs/config';

describe('RecipeService', () => {
  let service: RecipeService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: () => 'https://fakeapi.com',
          },
        },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return recipes filtered by ingredient', async () => {
    const mockResponse: AxiosResponse = {
      data: { meals: [{ idMeal: '1', strMeal: 'Chicken Soup' }] },
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders(),
      },
    };

    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

    const result = await service.getRecipes({ ingredient: 'chicken' });

    expect(result.meals).toHaveLength(1);
    expect(result.meals[0].strMeal).toBe('Chicken Soup');
    expect(httpService.get).toHaveBeenCalledWith('https://fakeapi.com/filter.php?i=chicken');
  });

  it('should return recipe details by ID', async () => {
    const mockResponse: AxiosResponse = {
      data: { meals: [{ idMeal: '52772', strMeal: 'Beef Stew' }] },
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders(),
      },
    };

    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

    const result = await service.getRecipeInfo('52772');

    expect(result.meals).toHaveLength(1);
    expect(result.meals[0].strMeal).toBe('Beef Stew');
    expect(httpService.get).toHaveBeenCalledWith('https://fakeapi.com/lookup.php?i=52772');
  });
});
