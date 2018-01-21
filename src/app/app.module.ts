import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        RecipesModule,
        SharedModule,
        ShoppingListModule,
        AuthModule
    ],
    providers: [ShoppingListService, RecipeService, DataStorageService, AuthService, AuthGuard], // added here because we need to access it from the recipe and shopping-list components
    bootstrap: [AppComponent]
})
export class AppModule { }
