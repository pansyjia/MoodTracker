import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the UsersserviceProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()



export class UsersserviceProvider {

  public data: any;
  public fireAuth: any;
  public userProfile: any;

  constructor() {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('users');
  }


  public loginUserService(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }


  public signupUserService(account: {}){
    return this.fireAuth.createUserWithEmailAndPassword(account['email'], account['password']).then((newUser) => {
      //sign in the user
      this.fireAuth.signInWithEmailAndPassword(account['email'], account['password']).then((authenticatedUser) => {
        //successful login, create user profile
        // this.userProfile.child(authenticatedUser.uid).set(
        //   account
        // );
        // return authenticatedUser.updateProfile({'displayName': account['displayName']}).catch(function(error) {
        //   console.log('Error updateing user profile:', error);
        // });
      });
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Error signing up:', errorCode, errorMessage);
    });

  }

  public signout() {
    this.fireAuth.signOut();
  }

  public getProfileName() {
    let user = firebase.auth().currentUser;
    console.log('user', user);
    let name = 'New user';

    if (user != null) {
      name = user.email;
    }
    return name;
  }
}
