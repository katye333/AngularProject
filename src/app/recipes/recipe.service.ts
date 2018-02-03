import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

// the recipes are currently managed in the recipe-list component
// and should be moved to here to be taken care of
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>(); // Pass an array of recipes

    // move the array of recipes from recipe-list to here
    // make it private so we can directly access this array from outside

    // add array of ingredients to the recipe models
    private recipes: Recipe[] = [
        new Recipe(
            'A Cheeseburger',
            'Omg just look at that thing',
            'https://www.restu.cz/ir/restaurant/f15/f15d493ba05c77bb95c268b80e97e785.jpg',
            [
                new Ingredient('Bun', 2),
                new Ingredient('Hamburger Meat', 1),
                new Ingredient('Lettuce', 4),
                new Ingredient('Tomato', 3),
                new Ingredient('Cheese', 2)
            ]),
        new Recipe(
            'A hotdog',
            'It feels like the fourth of july',
            'https://cdn.patchcdn.com/users/102397/2013/07/T800x600/309baba6eae6ee9d40447cef8ff07b59.png',
            [
                new Ingredient('Bun', 1),
                new Ingredient('Meat', 1),
                new Ingredient('Onion', 4),
                new Ingredient('Ketchup', 3),
                new Ingredient('Mustard', 2)
            ])
    ];

    constructor() { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    // access from the outside is not really possible
    // this method only returns a copy of our array
    getRecipes() {
        // will actually return the direct reference to this array
        // return this.recipes;

        // this returns a new array which is an exact copy of the old one
        return this.recipes.slice();
    }

    // get a single recipe by id 
    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    // push new recipe onto recipes array defined at the top
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    // replace the recipe at the given index with the new one
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}
