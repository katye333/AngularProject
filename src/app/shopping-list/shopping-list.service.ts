import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

// create the service
export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>(); // Pass an array of ingredients

    // Ingredient Model
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    // this method only returns a copy of our array
    // NOTE: This is the reason why our Add Ingredient button does not work!
    // Ingredients are added to the original array but getIngredients() returns a copy
    getIngredients() {
        return this.ingredients.slice();
    }

    // access my ingredients and push a new one on
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);

        // to fix problem caused by the copy of our ingredient array
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}
