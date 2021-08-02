import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recipe } from 'src/models/recipe.model';
import { DataStorageService } from 'src/services/data-storage.service';
import { RecipeService } from 'src/services/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(
    private dataStrogeService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStrogeService.fetchRecipes();
    } else {
      return recipes;
    }
    // return this.dataStrogeService.fetchRecipes();
  }
}
