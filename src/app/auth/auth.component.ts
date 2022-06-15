import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {getFirestore, collection, addDoc, setDoc, doc, Timestamp} from '@firebase/firestore/lite'
import { DbService } from '../db.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm= new FormGroup(
    {
      email: new FormControl(),
      password: new FormControl()

    }
  );

  uid: string = "NA";
  signRegister= true

  constructor(private db: DbService) {

   }

  ngOnInit(): void {
  }

  registerUser(){
    const auth= getAuth()
    createUserWithEmailAndPassword(auth, this.authForm.value.email, this.authForm.value.password)
    .then((userCredential)=>{
     
      console.log("User Created Successfully");
      const user= userCredential.user
      this.uid= user.uid

      const firestoreDB = getFirestore(this.db.app);

      const documentToWrite = doc(firestoreDB, 'users', this.uid);
        const userData = {
          name: '',
          phone: '',
          email: this.authForm.value.email,
          profileImage: '',
          address: '',
          uid: this.uid, 
          creationTime: Timestamp.now()
        };
        setDoc(documentToWrite, userData);
    })
    .catch((error)=>{
      console.log("Something went wrong");
      
    })
    
  }

  signInUser(){
    const auth= getAuth()
    signInWithEmailAndPassword(auth, this.authForm.value.email, this.authForm.value.password).then((userCredential)=> {
      console.log("User Created Successfully");
      const user= userCredential.user
      this.uid= user.uid  
    })
    .catch((error) =>{
      console.log("Something Went Wrong"); 
    })
  }

  switch(){
    console.log("Click succesful");
    this.signRegister= !this.signRegister 
  }

}
