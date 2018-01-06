import { Recipe } from './recipe.model';

// the recipes are currently managed in the recipe-list component
// and should be moved to here to be taken care of
export class RecipeService {

    // move the array of recipes from recipe-list to here
    // make it private so we can directly access this array from outside
    private recipes: Recipe[] = [
        new Recipe('Test Recipe', 'So good!', 'https://static.pexels.com/photos/257786/pexels-photo-257786.jpeg'),
        new Recipe('Test Recipe 2', 'Still good', 'http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/1506120378/MR_0917170472.jpg?itok=KPTNrvis')
    ];

    // access from the outside is not really possible
    // this method only returns a copy of our array
    getRecipes() {
        // will actually return the direct reference to this array
        // return this.recipes;

        // this returns a new array which is an exact copy of the old one
        return this.recipes.slice();
    }
}
