import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/models/ingrediants.model';
import { Recipe } from 'src/models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Schnitzel',
      'Perfect Schnitzel',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/pizza_on_toast_09337_16x9.jpg',
      [new Ingredient('meet', 1), new Ingredient('French fries', 20)]
    ),
    new Recipe(
      'Burger',
      'Amazing Burger',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/pizza_on_toast_09337_16x9.jpg',
      [new Ingredient('Buns', 2), new Ingredient('meet', 1)]
    ),
  ];

  constructor(private ShoppingListService: ShoppingListService) {}

  getRecipes() {
    // return the exact array copy without changing the original array
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingrediants: Ingredient[]) {
    this.ShoppingListService.addIngrediants(ingrediants);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
