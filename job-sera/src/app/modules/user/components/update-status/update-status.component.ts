import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyJobs } from '../../models/my-jobs';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss']
})
export class UpdateStatusComponent {

  @Output() closeUpdateStatus:EventEmitter<null> = new EventEmitter<null>();
 @Input() selectedUpdateJobStatus!:MyJobs;
 ngOnInit(){
  console.log(this.selectedUpdateJobStatus);
  
 }

 onCloseDetail(){
  this.closeUpdateStatus.emit()
 }

}
