import { Injectable } from '@angular/core';
//Firebase imports
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(
    //Angular fire authentication for use with firebase
    public afAuth: AngularFireAuth
  ) {
    console.log('Hello AuthServiceProvider Provider');
  }

  async doRegister(email, password) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
      throw e;
    }
  }

  async doLogin(email, password) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    } catch (e) {
      throw e;
    }
  }

}