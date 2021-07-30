import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/models/ingrediants.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingrediantsChange = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingrediants: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 2),
  ];

  constructor() {}

  getIngrediants() {
    return this.ingrediants.slice();
  }

  getIngrediant(index: number) {
    return this.ingrediants[index];
  }

  addIngrediant(ingrediant: Ingredient) {
    this.ingrediants.push(ingrediant);
    this.ingrediantsChange.next(this.ingrediants.slice());
  }

  addIngrediants(ingrediants: Ingredient[]) {
    this.ingrediants.push(...ingrediants);
    this.ingrediantsChange.next(this.ingrediants.slice());
  }

  updategetIngrediant(index: number, newgetIngrediant: Ingredient) {
    this.ingrediants[index] = newgetIngrediant;
    this.ingrediantsChange.next(this.ingrediants.slice());
  }

  DeleteIngrediant(index: number) {
    this.ingrediants.splice(index, 1);
    this.ingrediantsChange.next(this.ingrediants.slice());
  }
}
