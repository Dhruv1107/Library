import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userLoginStatus: boolean = false;
  currentUser: any;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.getLoggedInUser();

    this.authService.loginSubject.subscribe((status) => {
      this.userLoginStatus = status;
      this.currentUser = this.authService.getLoggedInUser();
    });
  }

  ngAfterViewInit(): void {
  }
}
