import { EventEmitter, OnDestroy } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/models/recipe.model';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  sub: Subscription;
  constructor(private RecipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.RecipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.RecipeService.getRecipes();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['/recipes/new']);
  }
}
