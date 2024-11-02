import { Component,  OnInit, inject } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './shared/components/header/header.component'
import { FooterComponent } from './shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone:true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterModule, CommonModule
  ]
})
export class AppComponent implements OnInit {
  title = 'job-sera';
  authService:AuthService = inject(AuthService);
  ngOnInit(): void {
    this.authService.autoLoginInFA()
  }

 
}
