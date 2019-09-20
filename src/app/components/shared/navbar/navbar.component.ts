import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { NavLink } from 'src/app/model/NavLink';
import NavLinks from '../../../json/navbar.json';
import { AuthService } from 'src/app/services/auth.service.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed: boolean = true;
  appTitle: string = "LIBRARY APP";
  beforeLoginNavbar: Array<NavLink> = [];
  afterLoginNavbar: Array<NavLink> = [];
  isLoggedIn: boolean = false;
  loginSubscription: Subscription;
  @Input() currentUser: any;
  @Input() userLoginStatus;

  constructor(private authService: AuthService) {
    NavLinks.beforeLoginNavbar.forEach(link => {
      this.beforeLoginNavbar.push(
        new NavLink(link.title, link.url, link.iconClass)
      );
    });

    NavLinks.afterLoginNavbar.forEach(link => {
      this.afterLoginNavbar.push(
        new NavLink(link.title, link.url, link.iconClass)
      );
    });
  }

  ngOnInit() {  }
}
