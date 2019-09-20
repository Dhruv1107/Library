import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { RouterLink, Router } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  books = [ ];

  searchedBook = [
    // {
    //         imgURL : 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png',
    //         title : 'Book2' ,
    //         isbn : '1234',
    //         author : 'Huckle123',
             // tslint:disable-next-line: max-line-length
    //         desc : 'Tempor veniam nostrud incididunt duis commodo minim ea consectetur ullamco eiusmod nostrud aliqua proident amet. Non nostrud consectetur consectetur in labore do adipisicing. Velit nostrud consequat sint adipisicing magna nostrud ut sunt elit quis. Sint adipisicing eiusmod culpa voluptate velit nostrud qui consectetur. Aute est adipisicing aliquip non occaecat voluptate minim commodo. Magna laborum aute excepteur occaecat deserunt magna sunt aute est deserunt. Veniam aliquip duis proident cillum.',
    //         releaseDate : 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time) ',
    //         issueDate : 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time) ',
    //         returnDate: 'Thu Sep 19 2019 00:00:00 GMT+0530 (India Standard Time) '
    // }
  ];

  private selectedBook = new BehaviorSubject<object>({});
  private userBooks = new BehaviorSubject<object>({});
  constructor(private router: Router, private modal: NgbModal ) { }

  // tslint:disable-next-line: ban-types
  async getReservedBooks() {
    const  user = JSON.parse(localStorage.getItem('user'));
    await fetch('/catalog/rentid/' + user._id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json())
    .then((response) => {
      console.log(response);
      this.userBooks.next(response);
    });
  }

  getReservedBooksOfUser() {
    return this.userBooks.asObservable();
  }
  // tslint:disable-next-line: ban-types
   async returnReservedBook(id: String) {
    const  user = JSON.parse(localStorage.getItem('user'));
    console.log(id);
    await fetch('/catalog/release', {
      method: 'POST',
      body: JSON.stringify({
        bookID: id,
        ownerID: user._id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response);
    });
    this.books = [];
    this.getReservedBooks();
  }

  reserveBook(book: object) {
    this.selectedBook.next(book);
    this.router.navigate(['reserveBook']);
  }

  getBookToReserve() {
    return this.selectedBook.asObservable();
  }

  async searchBookByISBN(isbn: string) {
    await fetch('/catalog/search', {
      method: 'POST',
      body: JSON.stringify({
        key: 'isbn',
        value: isbn
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log('in response');
      console.log(response);
      this.searchedBook = response;
    });

    if ( this.searchedBook.length > 0 && this.searchedBook[0].isbn === isbn) {
      if ( !this.searchedBook[0].rentedCount) {
         this.reserveBook(this.searchedBook[0]);
      } else {
        const modalRef = this.modal.open(NotificationComponent, { centered: true });
        modalRef.componentInstance.option = 'already';
      }
    } else {
      const modalRef = this.modal.open(NotificationComponent, { centered: true });
      modalRef.componentInstance.option = 'wrong';
      // alert('Book with ISBN not Found.');
    }
  }

  async reserveBookCall(book: object) {
    const diffInMs: number = Date.parse(book[0].returnDate) - Date.parse(book[0].issueDate);
    const days = diffInMs / (1000 * 3600 * 24);
    console.log('here');
    console.log(book[0]._id);
    const  user = JSON.parse(localStorage.getItem('user'));
    await fetch('/catalog/rent', {
      method: 'POST',
      body: JSON.stringify({
        bookID: book[0]._id,
        ownerID: user._id,
        startDate: book[0].issueDate,
        daysToRent: days
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then((response) => {
      this.books.push(book[0]);
      this.router.navigate(['reserveDashboard']);
    });

  }

}
