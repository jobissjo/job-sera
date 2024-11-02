import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JobApplication } from 'src/app/shared/Models/job.type';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
interface Status {
  title: string, icon: string, color: string, status: string
}

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss'],
  standalone: true,
  imports: [AngularMaterialModule, CommonModule]
})
export class UpdateStatusComponent {

  @Output() closeUpdateStatus: EventEmitter<null> = new EventEmitter<null>();
  @Input() selectedUpdateJobStatus!: JobApplication;
  ngOnInit() {
    console.log(this.selectedUpdateJobStatus);

  }

  onCloseDetail() {
    this.closeUpdateStatus.emit()
  }


  applicationStatus: Status[] = [
    { title: "Interviewing", icon: 'receipt_list', color: "accent", status: "interviewing" },
    { title: "Offer Received", icon: 'thumb_up', color: "primary", status: "offer received" },
    { title: "Hired", icon: 'person', color: "primary", status: "hired" },
    { title: "Not Selected by Employer", icon: 'close', color: "warn", status: "not selected" },
    { title: "No Longer Interested", icon: 'thumb_down', color: "warn", status: "rejected" }
  ]

  onUpdatedStatus(status:string) {
    // logic for update status


    //close the page
    this.onCloseDetail()
  }

}
