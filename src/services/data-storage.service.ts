import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from 'src/models/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private RecipeService: RecipeService,
    private authService: AuthService
  ) {}

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
    //take means to take only one var and immidiently unsubscribe
    // exhaustMap waits for the first observable to complete and then we can return a new observable that will replace the first observable
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(
          'https://ng-course-recipe-book-f6de4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
          { params: new HttpParams().set('auth', user.getToken()) }
        );
      }),
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
