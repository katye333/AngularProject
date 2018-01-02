import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[] = [
        new Recipe('Test Recipe', 'So good!', 'https://static.pexels.com/photos/257786/pexels-photo-257786.jpeg'),
        new Recipe('Test Recipe 2', 'Still good', 'http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/1506120378/MR_0917170472.jpg?itok=KPTNrvis')
    ];

    // The information contained in recipeWasSelected will be needed in the recipe component
    @Output() recipeWasSelected = new EventEmitter<Recipe>();

    constructor() { }
    ngOnInit() { }

    // The recipes variable defined above is a Recipe object from the recipe.model
    onRecipeSelected(recipe: Recipe) {
        this.recipeWasSelected.emit(recipe);
    }
}
