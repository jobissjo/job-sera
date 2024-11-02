import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ResponseNotification } from 'src/app/shared/Models/user-notification.types';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';

@Component({
  selector: 'app-employer-notification',
  templateUrl: './employer-notification.component.html',
  styleUrls: ['./employer-notification.component.scss'],
  standalone: true,
  imports: [CommonModule, AngularMaterialModule]
})
export class EmployerNotificationComponent {
  notifications: ResponseNotification[] = [];
  userId:string = '';
  usefulSelected:string[] = []
}
