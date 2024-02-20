import { Component } from '@angular/core';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { NotificationEnum, NotificationType } from 'src/app/shared/Models/notification.type';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],

})
export class NotificationsComponent {
  
  notifications: NotificationType[] = [
    {
      title: "You've invited to apply",
      message: "Hi Jobi, We found your CV and thought you would be a great match for the following job.",
      from: "User 1",
      date: "2024-02-02",
      position:"Python Developer",
      type:NotificationEnum.JobRecommendation
      
    },
    {
      title: "Haven't heard back?",
      message: "This is notification 2.",
      from: "User 2",
      date: "2024-02-03",
      position:"Python Developer",
      type:NotificationEnum.MessageToEmployer
    },
  ];

  daysAgoFn(date:string):number{
    let jobDate = new Date(date);
    let currentDate = new Date();

    const diffInMilliSeconds = currentDate.getTime() - jobDate.getTime();
    let msToDays:number = 1000*60*60*24;

    return Math.floor(diffInMilliSeconds/msToDays);
  }

  constructor(private dialogue:MatDialog){}
  openDialogue(){
    this.dialogue.open(DeleteNotificationDialog, {
      width:'300px',
      enterAnimationDuration:'100ms',
      exitAnimationDuration:'100ms'
    }) 
  }

}

@Component({
  selector: 'delete-notification-dialog',
  templateUrl: './delete-notification-dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  styles:[`.actions{
    display:'flex';
    justify-content:'space-between'
  }`]
})
export class DeleteNotificationDialog {
  constructor(public dialogRef: MatDialogRef<DeleteNotificationDialog>) {}
}