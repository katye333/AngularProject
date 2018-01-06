import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
    // No value assigned to it because recipe is coming from outside data source
    // Data coming from parent component so we need @Input() decorator
    @Input() recipe: Recipe;

    // inject the recipeService so we have access to everything in there
    constructor(private recipeService: RecipeService) { }
    ngOnInit() { }

    // recipeSelected event emitter (recipe.service.ts)
    // emit the recipe off this recipe item component because we selected this one and that's
    // the data we want to pass
    onSelected() {
        // console.log(this.recipe);
        this.recipeService.recipeSelected.emit(this.recipe);
    }
}
