import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})

// inject the ShoppingListService
export class ShoppingListComponent implements OnInit {
    // Ingredient Model 
    ingredients: Ingredient[];

    // inject the service 
    constructor(private slService: ShoppingListService) { }
    ngOnInit() {
        this.ingredients = this.slService.getIngredients(); // Get a copy of this array from our service
    }

    onIngredientAdded(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }

}
