import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    recipes: Recipe[]; // set value of recipe array on ngOnInit
    subscription: Subscription;

    // inject service 
    // shorthand: assign a property with the same name and angular handles it
    constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }
    ngOnInit() {

        this.subscription = this.recipeService.recipeChanged.subscribe(
            (recipes: Recipe[]) => {
                this.recipes = recipes
            }
        );
        this.recipes = this.recipeService.getRecipes(); // Get a copy of this array from our service
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // navigate to the relative link new with information about our current route 
    onNewRecipe() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }
}
