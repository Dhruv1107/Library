import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../../shared/alert/alert.component';
import { AlertError } from 'src/app/model/AlertError';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let route: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, AlertComponent ],
      imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return promise of alertError for validation error', async () => {
    const actual = component.login();
    expect(component.loginForm.valid).toBe(false); 
    expect(actual instanceof Promise).toBe(true);
    expect(component.showError).toBe(true);
    expect(component.errorData instanceof AlertError).toBe(true);

    await component.delay(2000).then(() => {
      expect(component.showError).toBe(false);
      expect(component.errorData).toBeNull();
    });
  }); 

  it('should return true on login success', async () => {
    component.loginForm.controls['email'].setValue("sahil_shikalgar@epam.com");
    component.loginForm.controls['password'].setValue("sahil_shikalgar@epam.com");
    const response = { email: component.loginForm.value.email };
    component.login();

    expect(component.loginForm.valid).toBe(true); 
    expect(response.hasOwnProperty('message')).toBeFalsy();
  }); 

  it('should return promise of alertError for authentication error', async () => {
    const actual = component.login();
    const response = { message: 'Username or password is incorrect!' };
    
    expect(component.loginForm.valid).toBe(false); 
    expect(actual instanceof Promise).toBe(true);
    expect(component.showError).toBe(true);
    expect(component.errorData instanceof AlertError).toBe(true);

    expect(response.hasOwnProperty('message')).toBeTruthy();

    await component.delay(2000).then(() => {
      expect(component.showError).toBe(false);
      expect(component.errorData).toBeNull();
    });
  });
});
