import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/models/ingrediants.model';
import { ShoppingListService } from 'src/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingrediants: Ingredient[];
  private igChangeSub: Subscription;

  constructor(private ShoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingrediants = this.ShoppingListService.getIngrediants();
    this.igChangeSub = this.ShoppingListService.ingrediantsChange.subscribe(
      (ingrediants: Ingredient[]) => {
        this.ingrediants = ingrediants;
      }
    );
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.ShoppingListService.startedEditing.next(index);
  }
}
