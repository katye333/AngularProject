import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[]; // set value of recipe array on ngOnInit

    // inject service 
    // shorthand: assign a property with the same name and angular handles it
    constructor(private recipeService: RecipeService) { }
    ngOnInit() {
        this.recipes = this.recipeService.getRecipes(); // Get a copy of this array from our service
    }
}
