import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AuthResponse } from '../Models/authResponse.model';
import { UserFireResponse } from '../Models/userFireResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private apiKey: string = 'AIzaSyAdkex8qVnKhQBbgl_ehfuOpOCzspBoDrU';

  user = new UserFireResponse('dummy@mail.com', '32423', '1234', new Date());
  userSub$ = new BehaviorSubject<UserFireResponse>(this.user);
  loggedInSub$ = new BehaviorSubject<boolean>(false);


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

  signOut(){
    this.loggedInSub$.next(false);
  }

  private handleCreateUser(res: AuthResponse) {
    const expiresInTs = new Date().getTime() + res.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);
    const user = new UserFireResponse(res.email, res.localId, res.idToken, expiresIn);

    this.userSub$.next(user);
    this.loggedInSub$.next(true);

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
    let loggedIn: boolean = false;
    this.loggedInSub$.subscribe(res => {
      loggedIn = res;
    })
    return loggedIn;
  }

}
