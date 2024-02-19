import { Injectable } from '@angular/core';
// import {
//   getAuth, createUserWithEmailAndPassword,
//   signInWithEmailAndPassword, UserCredential,
// } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private auth = getAuth();
  constructor() { }

  // registerUser(email: string, password: string) {
  //   createUserWithEmailAndPassword(this.auth, email, password)
  //     .then((userCredential) => {
  //       console.log("User credentials: ", userCredential);

  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode, errorMessage);
  //     })
  // };

  // loginUser(email: string, password: string) {
  //   signInWithEmailAndPassword(this.auth, email, password)
  //     .then((userCredential) => {
  //       this.setLoginToken(userCredential);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode, errorMessage);
  //     })
  // }

  // private setLoginToken(userCredential: UserCredential) {
  //   userCredential.user.getIdToken().then((response) => {
  //     let token = response;
  //     localStorage.setItem('loginToken', JSON.stringify(token));
  //     this.getLoginToken();
  //   });
  // }

  // getLoginToken() {
  //   const rawToken = localStorage.getItem('loginToken');
  //   let token: string = ''
  //   if (rawToken) {
  //     token = JSON.parse(rawToken);
  //     console.log("Local Storage Token", token);
  //   }
  //   return token;
  // }

  // verifyToken(token: string) {

  // }

}
