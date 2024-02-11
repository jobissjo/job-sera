import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports:[
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatStepperModule,
    MatListModule,
    MatDividerModule,
    MatBadgeModule
  ]
})
export class AngularMaterialModule { }
