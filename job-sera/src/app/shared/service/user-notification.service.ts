import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationType } from '../Models/user-notification.types';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  get_notification_by_position(position:string){
    let params = new HttpParams();
    params =params.append('position', position);
    console.log(params);
    let headers = this.authService.getHeader()
    return this.http.get<NotificationType[]>(`${environment.fastApiMainUrl}/notification/`, {params:params, headers:headers})
  }

  delete_user_notification(id:string,userId:string){
    let params = new HttpParams();
    params = params.append('delete_user_id ', userId);
    console.log(params);
    
    return this.http.put<NotificationType[]>(`${environment.fastApiMainUrl}/notification/${id}/`, userId )
  }
}
