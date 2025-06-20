import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { GetRecipesDto } from './dto/get-recipes.dto';

@Injectable()
export class RecipeService {
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const url = this.configService.get<string>('RECIPE_API_URL');
    if (!url) {
      throw new Error('RECIPE_API_URL is not defined in the environment');
    }
    this.baseUrl = url;
  }

  async getRecipes(query: GetRecipesDto) {
    const { ingredient, category, area, search } = query;

    let url = '';

    if (ingredient) {
      url = `${this.baseUrl}/filter.php?i=${ingredient}`;
    } else if (category) {
      url = `${this.baseUrl}/filter.php?c=${category}`;
    } else if (area) {
      url = `${this.baseUrl}/filter.php?a=${area}`;
    } else if (search) {
      url = `${this.baseUrl}/search.php?s=${search}`;
    } else {
      url = `${this.baseUrl}/search.php?s=`;
    }

    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getRecipeInfo(id: string) {
    const url = `${this.baseUrl}/lookup.php?i=${id}`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }
}
