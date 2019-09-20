import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { reservation } from '../reservationsconstants';
import { NotificationComponent } from '../../notification/notification.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reservebook',
  templateUrl: './reservebook.component.html',
  styleUrls: ['./reservebook.component.css']
})
export class ReservebookComponent implements OnInit {
  public reservation = reservation;
  books: any = [];
  myDate: Date = new Date();
  issueMinDate: Date;
  returnMinDate: Date;
  returnMaxDate: Date;
  returnDate = '';
  issueDate = '';

  constructor(private reservationService: ReservationService , private modal: NgbModal) { }
  ngOnInit() {
    this.reservationService.getBookToReserve().subscribe( (bookObj) => {
      this.books.push(bookObj);
    });
    this.issueMinDate = new Date(
      this.myDate.getFullYear(),
      this.myDate.getMonth(),
      this.myDate.getDate());
    this.returnMinDate = new Date(
      this.myDate.getFullYear(),
      this.myDate.getMonth(),
      this.myDate.getDate());
    // this.books = this.reservationService.getReservedBooks('user1');
    console.log('consructor');
    console.log(this.books);
  }
  setIssueDate(event: any) {
    this.returnMinDate = event;
    console.log('event');

    this.returnMaxDate = new Date(
      event.getFullYear(),
      event.getMonth(),
      event.getDate() + 14
    );
    this.returnDate = '';
    this.books[0].issueDate = event;
  }

  setReturnDate(event: any) {
    // this.reservationService.books[0].returnDate = event.getMonth() + 1 + '/' + event.getDate() + '/' + event.getFullYear();
    this.books[0].returnDate = event;
  }

  reserveBook() {
    console.log('book reserved');
    console.log(this.books);
    const modalRef = this.modal.open(NotificationComponent, { centered: true });
    modalRef.componentInstance.option = 'reserve';
    // alert('Book Reserved.');
    this.reservationService.reserveBookCall(this.books);
  }

}
