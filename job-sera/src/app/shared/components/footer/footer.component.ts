import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../module/angular-material/angular-material.module';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [AngularMaterialModule]
})
export class FooterComponent {

}
