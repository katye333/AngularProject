import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

// create the service
export class ShoppingListService {

    // Ingredient Model
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    // this method only returns a copy of our array
    getIngredients() {
        return this.ingredients.slice();
    }

    // access my ingredients and push a new one on
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }
}
