import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
    // Ingredient Model 
    ingredients: Ingredient[];

    // ViewChild() approach is used so any shopping list
    // of this component will ALL have an onAddItem()
    @ViewChild('nameInput') nameInputRef: ElementRef;
    @ViewChild('amountInput') amountInputRef: ElementRef;

    constructor(private slService: ShoppingListService) { }
    ngOnInit() { }

    // Emit an event that handles passing the data to the parent
    // component (shopping-list) which manages the array of ingredients
    onAddItem() {
        const ingName = this.nameInputRef.nativeElement.value;
        const ingAmount = this.amountInputRef.nativeElement.value;

        // Create an Ingredient object with the values of the input fields
        const newIngredient = new Ingredient(ingName, ingAmount);

        this.slService.addIngredient(newIngredient);
    }

}
