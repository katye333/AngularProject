import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
    // Ingredient Model 
    ingredients: Ingredient[];

    constructor(private slService: ShoppingListService) { }
    ngOnInit() { }

    // Pass the local form reference to this function 
    // Add the type of the form (NgForm)
    onAddItem(form: NgForm) {
        // Logging the output of form gives the entire NgForm object with 
        // the controls and their properties/value/events (for both form and controls)
        const value = form.value;
        console.log(value)
        const newIngredient = new Ingredient(value.name, value.amount);

        this.slService.addIngredient(newIngredient);
    }
}
