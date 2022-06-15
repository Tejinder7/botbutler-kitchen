import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from '@firebase/app';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DbService {

  app: FirebaseApp

  constructor() {
    this.app = initializeApp(environment.firebase);
    console.log("Firebase Initialized");
   }
}
