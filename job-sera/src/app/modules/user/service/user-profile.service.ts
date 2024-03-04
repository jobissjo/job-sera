import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetail } from '../models/my-jobs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http:HttpClient) { }
  private url :string = "https://job-sera-default-rtdb.firebaseio.com/"
  createUserProfile(user:UserDetail){
    return this.http.post(`${this.url}user-profile.json`, user).subscribe((res)=> {

    })
  }

  getProfile(userId:string){
    return this.http.get<UserDetail[]>(`${this.url}user-profile.json`).subscribe(res => {
      console.log(res);
      
    })
  }
  
}
