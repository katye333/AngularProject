import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {

    // use the routes defined on app-routing.module to get our recipes
    recipe: Recipe;
    id: number;

    // use the route to get the recipe id
    constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }
    ngOnInit() {

        // this gets the new id any time the route changes rather than only on init
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id']; // convert params['id'] to a number and save in property of class
                this.recipe = this.recipeService.getRecipe(this.id);
            }
        );
    }

    // we need to either:
    //   * get access to the shopping list service or 
    //   * get access to the recipe service then the recipe service accesses the shopping list service
    onAddToShoppingList() {
        this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }

    // navigate to the relative link edit with information about our current route 

    onEditRecipe() {
        this.router.navigate(['edit'], { relativeTo: this.route });
    }

    onDeleteRecipe() {
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['/recipes']);
    }
}
