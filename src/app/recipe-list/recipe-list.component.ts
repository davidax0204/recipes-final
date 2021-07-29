import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/models/recipe.model';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private RecipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.recipes = this.RecipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['/recipes/new']);
  }
}
