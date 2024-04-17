import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { NotificationType, ResponseNotification } from 'src/app/shared/Models/user-notification.types';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserNotificationService } from 'src/app/shared/service/user-notification.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserProfileService } from '../../service/user-profile.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],

})
export class NotificationsComponent implements OnInit {


  notifications: ResponseNotification[] = [];
  userId:string = '';
  constructor(private dialogue: MatDialog, private _snackBar: MatSnackBar,
    private notifyService: UserNotificationService,
    private authService: AuthService,
    private userService: UserProfileService) { }
  ngOnInit(): void {

    
    this.userId = this.authService.currentUserIdSub.getValue();
    this.notifyService.notificationSub.subscribe({
      next:res=>{
        this.notifications = res;
      }
    })
    this.getNotification();
  }

  getNotification(){
    
    this.userService.getProfileByUserId(this.userId).subscribe({
      next: res => {
        this.notifyService.get_notification_by_position(res.personalDetail.heading)

      }
    })
  }

  daysAgoFn(date: string): number {
    let jobDate = new Date(date);
    let currentDate = new Date();

    const diffInMilliSeconds = currentDate.getTime() - jobDate.getTime();
    let msToDays: number = 1000 * 60 * 60 * 24;

    return Math.floor(diffInMilliSeconds / msToDays);
  }


  showUsefulCardFooter: boolean = true;
  usefulSelected: string[] = []

  deleteNotification(notification: ResponseNotification) {
    let selectedNotificationId = notification.id;
    const dialogRef = this.dialogue.open(DeleteNotificationDialog, {
      width: '300px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // let index = this.notifications.findIndex(notifi => notifi.id == selectedNotificationId);
        // this.notifications.splice(index, 1)
        console.log(selectedNotificationId, this.userId);
        
        this.notifyService.delete_user_notification(selectedNotificationId, this.userId).subscribe({
          next:res => {
            this.getNotification()
          },
          error:err => {
            // this
          }
        })
      }

    })


  }

  openSnackBar(message: string, action: string, notification: ResponseNotification) {
    this._snackBar.open(message, action);
    this.showUsefulCardFooter = false;
    this.usefulSelected.push(notification.id);
    console.log(this.usefulSelected);
  }




}

@Component({
  selector: 'delete-notification-dialog',
  templateUrl: './delete-notification-dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  styles: [`.actions{
    display:'flex';
    justify-content:'space-between'
  }`]
})
export class DeleteNotificationDialog {
  constructor(public dialogRef: MatDialogRef<DeleteNotificationDialog>) { }

  noClick() {
    this.dialogRef.close(false);
  }

  okClick() {
    this.dialogRef.close(true);
  }
}