import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { reservation } from '../reservationsconstants';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { NotificationComponent } from '../../notification/notification.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-reservation-dashboard',
  templateUrl: './reservation-dashboard.component.html',
  styleUrls: ['./reservation-dashboard.component.css']
})
export class ReservationDashboardComponent implements OnInit {

  public reservation = reservation;
  searchISBN: any = '';
  constructor(private reservationService: ReservationService , public dialog: MatDialog , private modal: NgbModal) { }
  books: any = [];
  ngOnInit() {
    this.reservationService.getReservedBooks();
    this.reservationService.getReservedBooksOfUser().subscribe( (bookObj) => {
      this.books = bookObj;
    });
  }

  returnBook(id: any) {
    console.log(id);
    const modalRef = this.modal.open(NotificationComponent, { centered: true });
    modalRef.componentInstance.option = 'return';
    this.reservationService.returnReservedBook(id);
  }

  searchBook(isbn: string) {
    this.reservationService.searchBookByISBN(isbn);
  }

  confirmationPopUp(id: any) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '60%',
        data: 'Do you want to Return the book?'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.returnBook(id);
        }
      });
  }

  getReturnDate( Issuedate , noOfDays) {
    const date = new Date(Issuedate);
    date.setDate( date.getDate() + noOfDays );
    return date;
  }

}
