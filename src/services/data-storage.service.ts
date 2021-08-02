import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from 'src/models/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private RecipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.RecipeService.getRecipes();
    this.http
      .put(
        'https://ng-course-recipe-book-f6de4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-f6de4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingrediants ? recipe.ingrediants : [],
            };
          });
        }),
        tap((recipes) => {
          this.RecipeService.setRecipes(recipes);
        })
      );
  }
}
