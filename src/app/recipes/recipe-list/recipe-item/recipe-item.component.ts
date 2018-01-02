import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

    // No information is being passed to the parent component so the type is void
    @Output() recipeSelected = new EventEmitter<void>();

    constructor() { }
    ngOnInit() { }

    // This child component is being used from inside its parent component (recipe-list)
    // meaning we do not need to send it any information about the child that triggered the event
    onSelected() {
        this.recipeSelected.emit();
    }
}
