import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    // recipe is being passed to recipe-details from the recipe component (property binding)
    @Input() recipe: Recipe;

    constructor() { }
    ngOnInit() { }

}
