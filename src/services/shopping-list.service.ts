import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/models/ingrediants.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingrediantsChange = new Subject<Ingredient[]>();

  private ingrediants: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 2),
  ];

  constructor() {}

  getIngrediants() {
    return this.ingrediants.slice();
  }

  addIngrediant(ingrediant: Ingredient) {
    this.ingrediants.push(ingrediant);
    this.ingrediantsChange.next(this.ingrediants.slice());
  }

  addIngrediants(ingrediants: Ingredient[]) {
    this.ingrediants.push(...ingrediants);
    this.ingrediantsChange.next(this.ingrediants.slice());
  }
}
