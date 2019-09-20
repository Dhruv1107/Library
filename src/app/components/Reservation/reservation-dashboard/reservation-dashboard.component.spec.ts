import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDashboardComponent } from './reservation-dashboard.component';
import { ReservationService } from '../reservation.service';

describe('ReservationDashboardComponent', () => {
  let component: ReservationDashboardComponent;
  let fixture: ComponentFixture<ReservationDashboardComponent>;
  let reservationService ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationDashboardComponent);
    component = fixture.componentInstance;
    reservationService = fixture.debugElement.injector.get(ReservationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have h1 tag as Reservations', async(() => {
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const h2tag = compile.querySelector('h2');
    expect(h2tag.textContent).toBe('My Reservations');
  }));

  it('should display book title', () => {
    const mockBooks = [{
      imgURL : 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
      title : 'Book1' ,
      isbn : '1234',
      author : 'Huckle',
      // tslint:disable-next-line: max-line-length
      desc : 'Tempor veniam nostrud incididunt duis commodo minim ea consectetur ullamco eiusmod nostrud aliqua proident amet. Non nostrud consectetur consectetur in labore do adipisicing. Velit nostrud consequat sint adipisicing magna nostrud ut sunt elit quis. Sint adipisicing eiusmod culpa voluptate velit nostrud qui consectetur. Aute est adipisicing aliquip non occaecat voluptate minim commodo. Magna laborum aute excepteur occaecat deserunt magna sunt aute est deserunt. Veniam aliquip duis proident cillum.',
      releaseDate : '12/09/2018',
      issueDate : '13/09/2019',
      returnDate: '16/09/2019'
    }];
    spyOn(reservationService, 'getReservedBooks').and.returnValue(mockBooks[0]);

    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const bookTitle = compile.querySelector('h5');
    expect(bookTitle.textContent).toBe('Book1');
  });


  it('return book function called', async(() => {
    component.returnBook('1234');
    expect(component.books).toEqual([]);
  }));


});
