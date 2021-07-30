import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/models/ingrediants.model';
import { ShoppingListService } from 'src/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm: NgForm;
  sub: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private ShoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.sub = this.ShoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.ShoppingListService.getIngrediant(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const newIngrdient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.ShoppingListService.updategetIngrediant(
        this.editedItemIndex,
        newIngrdient
      );
    } else {
      this.ShoppingListService.addIngrediant(newIngrdient);
    }
    this.editMode = false;
    form.reset();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.ShoppingListService.DeleteIngrediant(this.editedItemIndex);
    this.onClear();
  }
}
