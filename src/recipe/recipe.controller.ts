import { Controller, Get, Query } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { GetRecipesDto } from './dto/get-recipes.dto';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  getRecipes(@Query() query: GetRecipesDto) {
    return this.recipeService.getRecipes(query);
  }

  @Get('info')
  getRecipeInfo(@Query('id') id: string) {
    return this.recipeService.getRecipeInfo(id);
  }
}
