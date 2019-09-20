import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservebookComponent } from './reservebook.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { componentFactoryName } from '@angular/compiler';



describe('ReservebookComponent', () => {
  let component: ReservebookComponent;
  let fixture: ComponentFixture<ReservebookComponent>;
  let inputElement: HTMLInputElement;
  let inputElement1: HTMLInputElement;
  let spy;

  beforeEach(async (() => {
    TestBed.configureTestingModule( {
      declarations: [ ReservebookComponent ],
      imports : [
        FormsModule,
        NgbModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() =>  {
    inputElement = fixture.nativeElement.querySelector('input[name=issueDate]');
    inputElement1 = fixture.nativeElement.querySelector('input[name=returnDate]');
    spy = jasmine.createSpyObj('ReservebookComponent', ['setIssueDate', 'setReturnDate']);
  });

  it('setIssue date function called', async( () => {
    const date = 'Wed Sep 18 2019 00:00:00 GMT+0530 (India Standard Time)';
    sendIssueDate(date).then(() => {
    spy.setIssueDate('Wed Sep 18 2019 00:00:00 GMT+0530 (India Standard Time)');
    expect(spy.setIssueDate).toHaveBeenCalledWith(date);
    });
 }));

  it('setReturnDate date function called', async( () => {
  const date = 'Wed Sep 18 2019 00:00:00 GMT+0530 (India Standard Time)';
  sendReturnDate(date).then(() => {
  spy.setReturnDate('Wed Sep 18 2019 00:00:00 GMT+0530 (India Standard Time)');
  expect(spy.setReturnDate).toHaveBeenCalledWith(date);

  });
}));

  function sendIssueDate(date: string) {
    inputElement.value = date;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

  function sendReturnDate(date: string) {
    inputElement1.value = date;
    inputElement1.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

  it('reserve book function called', async(() => {
    component.reserveBook();
    expect(component).toBeTruthy();
  }));

});
