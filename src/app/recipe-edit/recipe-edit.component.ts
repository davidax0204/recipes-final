import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/models/recipe.model';
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
    private RecipeService: RecipeService,
    private routerr: Router
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
              name: new FormControl(ingrediant.name, Validators.required),
              amount: new FormControl(ingrediant.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeFrom = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingrediants: recipeIngredients,
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeFrom.value['name'],
      this.recipeFrom.value['description'],
      this.recipeFrom.value['imagePath'],
      this.recipeFrom.value['ingrediants']
    );
    if (this.editMode) {
      this.RecipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.RecipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipeFrom.get('ingrediants')).controls;
  }

  onAddIngrediant() {
    (<FormArray>this.recipeFrom.get('ingrediants')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
  onCancel() {
    this.routerr.navigate(['../'], { relativeTo: this.router });
  }
  onDeleteIngdiant(index: number) {
    (<FormArray>this.recipeFrom.get('ingrediants')).removeAt(index);
  }
}
