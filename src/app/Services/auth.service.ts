import { Injectable } from '@angular/core';
import  firebase  from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 

import { GoogleAuthProvider, FacebookAuthProvider, getAuth, ActionCodeSettings } from 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public angularAuth: AngularFireAuth) { 


    
  }

  async registerUser(email:string, password:string) {

    return await this.angularAuth.createUserWithEmailAndPassword(email, password)

  }

  async loginUser(email:string, password:string){

    return await this.angularAuth.signInWithEmailAndPassword(email, password)

  }

  async resetPassword(email:string) {

    return await this.angularAuth.sendPasswordResetEmail(email)

  }

  async signOut() {

    return await this.angularAuth.signOut()

  }

  async getProfile() {

    return await this.angularAuth.currentUser

  }
  
  async processGoogleAuth() : Promise<any> {

    // firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential('', '365412329971-3snttj4n2hvgb2bade7r31sbtb1u5l0t.apps.googleusercontent.com'));

    let auth = getAuth();

    // const googleSignup = async (auth: any, provider: any) => {

    //     await signInWithPopup(auth, provider)
    
    // };

    return await this.angularAuth.signInWithPopup(new GoogleAuthProvider());

    // return await signInWithPopup(auth, new GoogleAuthProvider());
  }

  async processFaceBookAuth() : Promise<any> {

    let auth = getAuth();

    return await this.angularAuth.signInWithPopup(new FacebookAuthProvider());
  }

  async checkIfEmailExists(email: string): Promise<boolean> {
    try {
      const userCredential = await this.angularAuth.fetchSignInMethodsForEmail(email);
      console.log(userCredential)
      return userCredential && userCredential.length > 0;
    } catch (error) {
      // Handle error if needed
      console.error('Error checking if email exists:', error);
      return false;
    }
  }

}
