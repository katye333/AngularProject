import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
    // recipe is being passed to recipe-details from the recipe component (property binding)
    @Input() recipe: Recipe;

    constructor(private recipeService: RecipeService) { }
    ngOnInit() { }

    // we need to either:
    //   * get access to the shopping list service or 
    //   * get access to the recipe service then the recipe service accesses the shopping list service
    onAddToShoppingList() {
        this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }
}
