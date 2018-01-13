import { Component, OnInit, OnDestroy } from '@angular/core';
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

    // store subscription in a variable so it can be destroyed later
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;

    constructor(private slService: ShoppingListService) { }

    // start listening to the editing subject
    ngOnInit() {

        // we get the number of the item that is about to be editted
        // only get here inside this function is editted was started 
        this.subscription = this.slService.startedEditing.subscribe(
            (index: number) => {
                this.editedItemIndex = index;
                this.editMode = true;
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // Pass the local form reference to this function 
    // Add the type of the form (NgForm)
    onAddItem(form: NgForm) {
        // Logging the output of form gives the entire NgForm object with 
        // the controls and their properties/value/events (for both form and controls)
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);

        this.slService.addIngredient(newIngredient);
    }
}
