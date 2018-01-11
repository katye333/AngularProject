import { Subject } from 'rxjs/Subject';
import { Ingredient } from '../shared/ingredient.model';

// create the service
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>(); // Pass an array of ingredients

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
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // do not use a loop 
        // we emit a lot of events so bad idea

        // spread operator turns an array of elements into a list of elements
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
