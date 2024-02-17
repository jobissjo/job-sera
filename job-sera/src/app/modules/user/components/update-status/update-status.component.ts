import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyJobs } from '../../models/my-jobs';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss']
})
export class UpdateStatusComponent {

  @Output() closeUpdateStatus: EventEmitter<null> = new EventEmitter<null>();
  @Input() selectedUpdateJobStatus!: MyJobs;
  ngOnInit() {
    console.log(this.selectedUpdateJobStatus);

  }

  onCloseDetail() {
    this.closeUpdateStatus.emit()
  }

  applicationStatus: { title: string, icon: string, color:string, status:string }[] = [
    { title:"Interviewing", icon:'receipt_list',color:"accent", status:"interviewing"},
  { title:"Offer Received", icon:'thumb_up',color:"primary", status:"offer received"},
    { title:"Hired", icon:'person',color:"primary", status:"hired"},
    { title:"Not Selected by Employer", icon:'close',color:"warn", status:"not selected"},
    { title:"No Longer Interested", icon:'thumb_down',color:"warn", status:"rejected"}
  ]

}