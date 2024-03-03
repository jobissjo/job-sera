import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AuthResponse } from '../Models/authResponse.model';
import { UserFireResponse } from '../Models/userFireResponse.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  private apiKey: string = 'AIzaSyAdkex8qVnKhQBbgl_ehfuOpOCzspBoDrU';

  user = new UserFireResponse('dummy@mail.com', '32423', '1234', new Date());
  userSub$ = new BehaviorSubject<UserFireResponse>(this.user);
  loggedInSub$ = new BehaviorSubject<boolean>(false);
  timeFunctionId: any;


  signUp(email: string, password: string) {
    const user = { email: email, password: password, returnSecureToken: true };
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey,
      user).pipe(catchError(err => {
        return this.handleError(err)
      }),
        tap((res) => {
          return this.handleCreateUser(res)
        }))
  }

  signIn(email: string, password: string) {
    const user = { email: email, password: password, returnSecureToken: true };
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.apiKey,
      user).pipe(catchError(err => {
        return this.handleError(err)
      }),
        tap((res) => {
          this.handleCreateUser(res);
        }))
  }

  autoLogin() {
    let user = localStorage.getItem('user');

    if (user) {
      let parsedUser = JSON.parse(user);
      const userObj = new UserFireResponse(parsedUser.email, parsedUser.id, parsedUser._token, parsedUser._expiresIn);

      if (userObj.token) {
        this.userSub$.next(userObj)
        this.loggedInSub$.next(true);
        const expiresIn = parsedUser._expiresIn - new Date().getTime();
        this.autoLogout(expiresIn)

      }
    }
  }

  autoLogout(expiresIn: number) {
    this.timeFunctionId = setTimeout(() => {
      this.signOut()
    }, expiresIn)
  }

  signOut() {
    this.loggedInSub$.next(false);
    localStorage.removeItem('user');
    this.router.navigate([''])

    if (this.timeFunctionId) {
      clearTimeout(this.timeFunctionId)
    }
  }

  private handleCreateUser(res: AuthResponse) {
    const expiresInTs = new Date().getTime() + res.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);
    const user = new UserFireResponse(res.email, res.localId, res.idToken, expiresIn);

    this.userSub$.next(user);
    this.loggedInSub$.next(true);

    localStorage.setItem('user', JSON.stringify(user));
    this.autoLogout(res.expiresIn * 1000)

  }




  private handleError(err: any) {
    let errorMsg = "The unknown error occurred";

    if (!err.error?.error) {
      return throwError(() => errorMsg)
    }

    switch (err.error.error.message) {
      case "EMAIL_EXISTS":
        errorMsg = 'The email already exists'
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMsg = "This operation is not allowed"
        break;
      case "INVALID_LOGIN_CREDENTIALS":
        errorMsg = "This email or password is not correct"
        break;
    }
    return throwError(() => errorMsg);
  }

  isAuthenticated() {
    return this.loggedInSub$.getValue();
  }

}
