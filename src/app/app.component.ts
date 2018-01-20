import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    loadedFeature = 'recipe';

    ngOnInit() {
        firebase.initializeApp({
            apiKey: 'AIzaSyAXq_3vBYiIt5_uIPSifwbuh6g4S1MAoKc',
            authDomain: 'ng-recipe-book-d219c.firebaseapp.com'
        });
    }

    onNavigate(feature: string) {
        this.loadedFeature = feature;
    }
}
