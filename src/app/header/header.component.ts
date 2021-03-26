import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../_store/app.reducer';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>, private angularAuth: AngularFireAuth) { }

  ngOnInit() {
    this.angularAuth.authState.subscribe((firebaseUser: firebase.User) => {
      if (firebaseUser) {
       firebaseUser.getIdToken().then((token) => {
          console.log(token);
        });
      }
    });
  }

  onGoogleLoginClick() {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.addScope('email');
    googleProvider.addScope('profile');
    return this.angularAuth.signInWithPopup(googleProvider);
  }

}
