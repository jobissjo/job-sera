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

  user = new UserFireResponse('dummy@gmail.com', '32423', 'fdsfgdskj234324', new Date());
  userSub = new BehaviorSubject<UserFireResponse>(this.user);


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

  private handleCreateUser(res: AuthResponse) {
    const expiresInTs = new Date().getTime() + res.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);
    const user = new UserFireResponse(res.email, res.localId, res.idToken, expiresIn);

    this.userSub.next(user);

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

}
