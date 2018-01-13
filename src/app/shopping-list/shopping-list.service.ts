import { Subject } from 'rxjs/Subject';
import { Ingredient } from '../shared/ingredient.model';

// create the service
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>(); // Pass an array of ingredients
    startedEditing = new Subject<number>(); // listenes for the shopping list to get edited

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

    // get the item about to be edited using index
    getIngredient(index: number) {
        return this.ingredients[index];
    }

    // access my ingredients and push a new one on
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);

        // to fix problem caused by the copy of our ingredient array
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // do not use a loop 
        // we emit a lot of events so bad idea

        // spread operator turns an array of elements into a list of elements
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    // index is required to know what ingredient is being updated 
    // newIngredient is the new object 
    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
