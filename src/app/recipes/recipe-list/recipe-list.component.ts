import { Router, ActivatedRoute } from '@angular/router';
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
    constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }
    ngOnInit() {
        this.recipeService.recipeChanged.subscribe(
            (recipes: Recipe[]) => {
                this.recipes = recipes;
            }
        );
        this.recipes = this.recipeService.getRecipes(); // Get a copy of this array from our service
    }

    // navigate to the relative link new with information about our current route 
    onNewRecipe() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }
}
