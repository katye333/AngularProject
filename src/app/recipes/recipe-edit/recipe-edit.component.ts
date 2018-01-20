import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    id: number;
    editMode = false;
    recipeForm: FormGroup;

    // retrieve our recipe service 
    constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }
    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];

                this.editMode = params['id'] != null; // if the id is null, then we are not in editMode
                this.initForm(); // call method on page change 
            }
        );
    }

    onSubmit() {
        console.log(this.recipeForm);
    }

    // add a new control to the array of ingredient controls
    onAddIngredient() {

        // explicitly cast the new ingredient to use a FormArray
        // set the default value to null (no default value)
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),

                // run amount through two validators to check required and that the input is a number
                'amount': new FormControl(null, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
        );
    }

    // initialize the form with data depending on if in editMode or not
    private initForm() {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);

        // if in editMode, populate the above variables with data from the recipe service
        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id); // use service to get recipe name from id
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;

            // does the recipe have ingredients defined
            if (recipe['ingredients']) {
                for (let ingredient of recipe.ingredients) {
                    recipeIngredients.push(
                        new FormGroup({
                            'name': new FormControl(ingredient.name, Validators.required),

                            // run amount through two validators to check required and that the input is a number
                            'amount': new FormControl(ingredient.amount, [
                                Validators.required,
                                Validators.pattern(/^[1-9]+[0-9]*$/)
                            ])
                        })
                    );
                }
            }
        }

        // base form is created 
        this.recipeForm = new FormGroup({

            // add a reference to the required validator 
            'name': new FormControl(recipeName, Validators.required),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'ingredients': recipeIngredients
        });
    }
}
