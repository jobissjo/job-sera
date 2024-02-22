import { Component } from '@angular/core';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { NotificationEnum, NotificationType } from 'src/app/shared/Models/notification.type';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],

})
export class NotificationsComponent {

  notifications: NotificationType[] = [
    {
      notificationId: "1234",
      title: "You've invited to apply",
      message: "Hi Jobi, We found your CV and thought you would be a great match for the following job.",
      from: "User 1",
      date: "2024-02-02",
      position: "Python Developer",
      type: NotificationEnum.JobRecommendation

    },
    {
      notificationId: '1224',
      title: "Haven't heard back?",
      message: "This is notification 2.",
      from: "User 2",
      date: "2024-02-03",
      position: "Python Developer",
      type: NotificationEnum.MessageToEmployer
    },
  ];

  daysAgoFn(date: string): number {
    let jobDate = new Date(date);
    let currentDate = new Date();

    const diffInMilliSeconds = currentDate.getTime() - jobDate.getTime();
    let msToDays: number = 1000 * 60 * 60 * 24;

    return Math.floor(diffInMilliSeconds / msToDays);
  }

  constructor(private dialogue: MatDialog, private _snackBar: MatSnackBar) { }
  showUsefulCardFooter: boolean = true;
  usefulSelected: string[] = []

  deleteNotification(notification: NotificationType) {
    let selectedNotificationId = notification.notificationId;
    const dialogRef = this.dialogue.open(DeleteNotificationDialog, {
      width: '300px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let index = this.notifications.findIndex(notifi => notifi.notificationId == selectedNotificationId);
        this.notifications.splice(index, 1)
      }

    })


  }

  openSnackBar(message: string, action: string, notification: NotificationType) {
    this._snackBar.open(message, action);
    this.showUsefulCardFooter = false;
    this.usefulSelected.push(notification.notificationId);
    console.log(this.usefulSelected);
  }

  // sortByDate(notifications: NotificationType[]): NotificationType[] {
  //   return notifications.sort((a, b) => {
  //     const dateA = new Date(a.date); // Create Date objects for each notification
  //     const dateB = new Date(b.date);
  
  //     // Ensure proper date comparison by handling invalid dates gracefully
  //     if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
  //       console.warn('Invalid date encountered during notification sorting. ' +
  //                   'Notifications with invalid dates will be placed at the end.');
  //       return 0; // Place notifications with invalid dates at the end
  //     }
  
  //     return dateB.getTime() - dateA.getTime(); // Sort in descending order (latest first)
  //   });



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