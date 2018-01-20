import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

    // inject service here to recipeService
    // the recipe service is provided on this component and all other 
    // components in the recipes folder all use the same instance

    // Otherwise the service where I emit the event would be a different
    // one than the one that listened to it so I would NEVER get informed
    // about the event 
    constructor() { }

    ngOnInit() { }
}
