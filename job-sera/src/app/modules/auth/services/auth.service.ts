import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AuthResponse, } from '../Models/authResponse.model';
import { UserFireResponse } from '../Models/userFireResponse.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HandleMessageService } from 'src/app/shared/service/handle-message.service';
import { CreateUserModel, ResponseUserModel, TokenResponse } from 'src/app/shared/Models/auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private handleMsgService: HandleMessageService) { }
  private apiKey: string = 'AIzaSyAdkex8qVnKhQBbgl_ehfuOpOCzspBoDrU';

  userFA:ResponseUserModel = {id: '', username:'', email:'', role:'', active:false};
  userSubFA$ = new BehaviorSubject<ResponseUserModel>(this.userFA);


  user = new UserFireResponse('dummy@mail.com', '32423', '1234', new Date());
  userSub$ = new BehaviorSubject<UserFireResponse>(this.user);


  loggedInSub$ = new BehaviorSubject<boolean>(false);
  timeFunctionId: any;
  currentUserIdSub = new BehaviorSubject<string>('');

  newSignUp() {

  }
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
    console.log("response from handle user", res);
    this.currentUserIdSub.next(res.localId);
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

  /// For FastApi Login

  signInFA(email: string, password: string) {

    let username: string = email.split('@')[0]
    if (!username) {
      console.warn("username can't find");
      return
    }
    const formData = new HttpParams()
      .set('grant_type', '')
      .set('username', username)
      .set('password', password)
      .set('scope', '')
      .set('client_id', '')
      .set('client_secret', '');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post<TokenResponse>(`${environment.fastApiMainUrl}/token`, formData.toString(), { headers })
      .subscribe({
        next: res => {
          this.storeTokenInLs(res.access_token);
          this.getCurrentUser(res);
          this.loggedInSub$.next(true);
          this.router.navigate(['user']);
          
        },
        error: err => {
          console.error(err);
        }
      });
  }

  signUpInFA(data: CreateUserModel) {


    this.http.post(`${environment.fastApiMainUrl}/users`, data).subscribe({
      next: res => {
        console.log(res);
        this.handleMsgService.successMessage("User Created Successfully", "User Created");
        this.router.navigate(['auth', 'sign-in']);
      }
    })
  }

  getCurrentUser(headerInfo: TokenResponse) {
    const headers = new HttpHeaders({
      'Authorization': `${headerInfo.token_type} ${headerInfo.access_token}`
    })
    this.http.get<ResponseUserModel>(`${environment.fastApiMainUrl}/users/me`, { headers: headers }).subscribe({
      next:res => {
        console.log(res);
        this.userSubFA$.next(res);
        this.currentUserIdSub.next(res.id);
        // this.currentUserIdSub.
        return res;
      },
      error:_err => {
        console.log("failed man you");
        
        return false;
      }
    })
  }

  storeTokenInLs(token: string) {
    localStorage.setItem('token', JSON.stringify(token))
  }

  getTokenInLs() {
    let localRes = localStorage.getItem('token')
    if (!localRes) {
      console.warn("You are not authenticated yet");
      return;
    }
    const token: string = JSON.parse(localRes)
    return token
  }

  isEmployerAuthenticated(){
    let token = this.getTokenInLs()
    if(token){
      const myObj:TokenResponse = {access_token :token, token_type: "Bearer"}
      this.getCurrentUser(myObj)
    }  
  }



}



