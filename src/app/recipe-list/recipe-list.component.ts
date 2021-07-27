import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'A test Recipe',
      'Test',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/pizza_on_toast_09337_16x9.jpg'
    ),
    new Recipe(
      'A test2 Recipe',
      'Test2',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/pizza_on_toast_09337_16x9.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
