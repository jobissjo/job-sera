import { Component } from '@angular/core';
import { NotificationType } from 'src/app/shared/Models/notification.type';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  notifications: NotificationType[] = [
    {
      title: "Notification 1",
      message: "This is notification 1.",
      from: "User 1",
      date: "2024-02-02"
    },
    {
      title: "Notification 2",
      message: "This is notification 2.",
      from: "User 2",
      date: "2024-02-03"
    },
    // Add more objects as needed
  ];

}
