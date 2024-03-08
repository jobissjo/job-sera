import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetail } from '../models/my-jobs';
import { HandleMessageService } from 'src/app/shared/service/handle-message.service';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient, private handleMsgService: HandleMessageService) { }
  private url: string = "https://job-sera-default-rtdb.firebaseio.com/";

  // currentProfileIdSub$ = new BehaviorSubject<string>('')
  createUserProfile(user: UserDetail) {
    return this.http.post(`${this.url}user-profile.json`, user).subscribe((res) => {
      console.log(res);
      
      this.handleMsgService.successMessage(
        "User profile details are successfully update",
        "Profile Updated"
      )
    })
  }

  getProfile(profileId: string) {
    return this.http.get<UserDetail>(
      `${this.url}user-profile/${profileId}.json`).subscribe(res => {
        console.log( "getProfile", res);
        
      })
  }

  getProfileByUserId(userId: string) {

    return this.http.get<{ [key: string]: UserDetail }>(
      `${this.url}user-profile.json`
    ).pipe(
      map((profiles: { [key: string]: UserDetail }) => {
        for (const profileId in profiles) {
          if (profiles.hasOwnProperty(profileId)) {
            const profile = profiles[profileId];

            if(profile.userId === userId){
              profile.profileId = profileId;
              console.log("From by Userid", profile);
              
              return profile
            }
          }
        }

        return false;
      })
    )
  }

  updateProfile(userDetail:UserDetail){
    const profileId = userDetail.profileId;
    console.log("Profile id",profileId);
    
    return this.http.put(`${this.url}user-profile/${profileId}.json`,userDetail).subscribe((res) => {
      console.log(res);
      this.handleMsgService.successMessage(
        "User profile details are successfully update",
        "Profile Updated"
      )
    })
  }

}
