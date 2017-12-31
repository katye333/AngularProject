import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[] = [
        new Recipe('Test Recipe', 'So good!', 'https://static.pexels.com/photos/257786/pexels-photo-257786.jpeg'),
        new Recipe('Test Recipe 2', 'Still good', 'https://static.pexels.com/photos/257786/pexels-photo-257786.jpeg')
    ];

    constructor() { }
    ngOnInit() { }

}
