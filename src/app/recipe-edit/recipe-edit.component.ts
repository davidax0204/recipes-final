import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeFrom: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private RecipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.RecipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.decription;
      if (recipe['ingrediants']) {
        for (let ingrediant of recipe.ingrediants) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingrediant.name),
              amount: new FormControl(ingrediant.amount),
            })
          );
        }
      }
    }

    this.recipeFrom = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingrediants: recipeIngredients,
    });
  }

  onSubmit() {
    console.log(this.recipeFrom);
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipeFrom.get('ingrediants')).controls;
  }
}
