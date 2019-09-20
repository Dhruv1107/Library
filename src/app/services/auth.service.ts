import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SearchService } from '../components/dashboard/search.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  loginSubject = new BehaviorSubject(false);

  constructor(public router: Router, private searchService: SearchService) {
    if(this.isLoggedIn()) {
      this.loginSubject.next(true);
      this.router.navigate(['dashboard']);
    }
  }

  async signup(signupData: { email: string, password: string, firstName: string, lastName:string }) {
    return await fetch('/users/register', {
      method: 'POST',
      body: JSON.stringify({
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        username: signupData.email,
        password: signupData.password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then((response) => {
      return response;
    })
  }

  async login(loginData: { email: string, password: string } ) {
    return await fetch('/users/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        username: loginData.email,
        password: loginData.password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then((response) => {
      return this.setUserCredentials(response);
    });
  }

  async logout() {
    localStorage.removeItem('user');
    this.loginSubject.next(false);
    this.searchService.resetInput();
    this.router.navigate(['auth/login']);
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    user !== null ? this.user = user : this.user = null;
    return this.user !== null;
  }

  setUserCredentials(response) {
    if(!response.hasOwnProperty('message')) {
      localStorage.setItem("user", JSON.stringify(response));
      this.isLoggedIn();
    }
    return response;
  }

  getLoggedInUser() {
    return this.user;
  }
}
