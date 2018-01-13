import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    // update the form if in edit mode
    // this gives us access to the form object
    @ViewChild('listForm') slForm: NgForm;

    // store subscription in a variable so it can be destroyed later
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

    constructor(private slService: ShoppingListService) { }

    // start listening to the editing subject
    ngOnInit() {

        // we get the number of the item that is about to be editted
        // only get here inside this function is editted was started 
        this.subscription = this.slService.startedEditing.subscribe(
            (index: number) => {
                this.editedItemIndex = index;
                this.editMode = true;
                this.editedItem = this.slService.getIngredient(index); // retrieve item object by index

                // the row of the item about to be edited will have its name
                // and amount input elements populated with the previous values
                this.slForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                });
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // Pass the local form reference to this function 
    // Add the type of the form (NgForm)
    onSubmit(form: NgForm) {
        // Logging the output of form gives the entire NgForm object with 
        // the controls and their properties/value/events (for both form and controls)
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);

        if (this.editMode) {
            this.slService.updateIngredient(this.editedItemIndex, newIngredient);
        }
        else {
            this.slService.addIngredient(newIngredient);
        }

        // reset form after add/updating and reset editMode
        this.editMode = false;
        form.reset();
    }

    onClear() {
        // ViewChild (ie., slForm) is the html form 
        // form (in above method) is the reference of our form object
        this.slForm.reset();
        this.editMode = false;
    }

    // after deleting an element, call onClear() button so no duplicate code
    onDelete() {
        this.slService.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }
}
