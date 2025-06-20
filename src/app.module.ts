import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RecipeModule } from './recipe/recipe.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule, RecipeModule],
})
export class AppModule {}
