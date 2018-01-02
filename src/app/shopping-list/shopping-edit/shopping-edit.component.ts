import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

    // ViewChild() approach is used so any shopping list
    // of this component will ALL have an onAddItem()
    @ViewChild('nameInput') nameInputRef: ElementRef;
    @ViewChild('amountInput') amountInputRef: ElementRef;

    // Type definition is an object with the following properties: { name: string, amount: number }
    // Ingredient object can be used in its place thou
    @Output() ingredientAdded = new EventEmitter<Ingredient>();

    constructor() { }
    ngOnInit() { }

    // Emit an event that handles passing the data to the parent
    // component (shopping-list) which manages the array of ingredients
    onAddItem() {
        const ingName = this.nameInputRef.nativeElement.value;
        const ingAmount = this.amountInputRef.nativeElement.value;

        // Create an Ingredient object with the values of the input fields
        const newIngredient = new Ingredient(ingName, ingAmount);

        this.ingredientAdded.emit(newIngredient);
    }

}
