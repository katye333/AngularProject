import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
// import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from "../recipe.service";

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
    constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }
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
        if (this.editMode) {
            this.recipeService.updateRecipe(this.id, this.recipeForm.value);
        }
        else {
            this.recipeService.addRecipe(this.recipeForm.value);
        }

        this.onCancel();
    }

    // fixed problem with getting the controls property from this.recipeForm.get('ingredients')
    // create a get method that can be called in the html and specifically cast to FormArray
    get ingredientData() { return <FormArray>this.recipeForm.get('ingredients'); }

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

    onCancel() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    onDeleteIngredient(index: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    // initialize the form with data depending on if in editMode or not
    private initForm() {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        const recipeIngredients = new FormArray([]);

        // if in editMode, populate the above variables with data from the recipe service
        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id); // use service to get recipe name from id
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;

            // does the recipe have ingredients defined
            if (recipe['ingredients']) {
                for (const ingredient of recipe.ingredients) {
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
