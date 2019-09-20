import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';
import { AlertError } from 'src/app/model/AlertError';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from '../../notification/notification.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('card', { static: false }) element: ElementRef;
  loginForm: FormGroup;
  showError: boolean = false;
  errorData: AlertError;
  marginTop;
  pageName: string;
  submitted: boolean = false;

  alphabetValidation = {
    firstName: true,
    lastName: true
  };
  
  constructor(private renderer: Renderer2, private authService: AuthService, private router: Router, public modal: NgbModal) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl("" , [Validators.required, Validators.email]),
      'password': new FormControl("" , [Validators.required, Validators.minLength(8)]),
    });

    if(this.router.url === '/auth/signup') {
      this.loginForm.addControl('firstName',new FormControl("", [ Validators.required, Validators.maxLength(15)]));
      this.loginForm.addControl('lastName',new FormControl("", [Validators.required, Validators.maxLength(15)]));
      this.pageName = "Sign Up";
    }
    else {
      this.loginForm.removeControl('firstName');
      this.loginForm.removeControl('lastName');
      this.pageName = "Log In";
    }
  }

  ngAfterViewInit(): void {
    this.marginTop = (window.innerHeight - 32)  / 2 - this.element.nativeElement.offsetHeight / 2 - window.innerHeight * 0.05 - 14;
    this.renderer.setStyle(this.element.nativeElement, 'margin-top', `${this.marginTop}px`);
  }

  async login() {
    let response;

    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return false;
    }
    
    this.submitted = true;
    if(this.pageName === "Log In") {
      response = await this.authService.login(this.loginForm.value);
    }
    else {
      if(!this.nameValidation('firstName') || !this.nameValidation('lastName')) 
        return;
      response = await this.authService.signup(this.loginForm.value);
    }  
    this.submitted = false;   
    
    if(response.hasOwnProperty('message'))
      this.showAlert("alert-danger", response.message, 2000);
    else if(Object.keys(response).length === 0) {
      await this.showAlert("alert-success", this.pageName + " Succeed !", 1000);
      this.router.navigate(['login']);
    }
    else {
      await this.showAlert("alert-success", this.pageName + " Succeed !", 1000);
      this.authService.loginSubject.next(true);
      this.modal.open(NotificationComponent, { centered: true }); 
    }
    return true;
  }

  delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(this), time);
    });
  }

  showAlert(className: string, message: string, time: number) {
    this.showError = true;
    this.errorData = new AlertError(className, message);
    return this.delay(time).then(() => {
      this.showError = false;
      this.errorData = null;
    });
  }

  nameValidation(control: string) {
    if(this.loginForm.get(control).value.match('^[a-zA-Z]*$')) {
      this.alphabetValidation[control] = true;
      return true;
    }
    else {
      this.alphabetValidation[control] = false;
      return false;
    }
  }
}
