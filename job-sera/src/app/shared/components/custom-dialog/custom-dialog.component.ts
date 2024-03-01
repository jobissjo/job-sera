import { Component } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
    selector: 'custom-dialog.component',
    templateUrl: './custom-dialog.component.html',
    standalone: true,
    imports: [MatButtonModule, MatDialogModule],
    styles: [`.actions{
      display:'flex';
      justify-content:'space-between'
    }`]
})
export class CustomDialogComponent {
    constructor(public dialogRef: MatDialogRef<CustomDialogComponent>) { }

    noClick() {
        this.dialogRef.close(false);
    }

    okClick() {
        this.dialogRef.close(true);
    }
}