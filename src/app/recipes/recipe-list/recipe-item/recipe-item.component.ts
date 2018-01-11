import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
    // No value assigned to it because recipe is coming from outside data source
    // Data coming from parent component so we need @Input() decorator
    @Input() recipe: Recipe;
    @Input() index: number;

    // inject the recipeService so we have access to everything in there
    ngOnInit() { }
}
