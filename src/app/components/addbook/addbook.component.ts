import { Component, OnInit, ViewChild, ElementRef, ɵConsole } from '@angular/core';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  imageUrl: any;
  success:boolean=false;
  displayMessage:true;
  isbnPattern = "^(?:ISBN(?:-10)?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$)[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$";
  unamePattern = "^[a-zA-Z\\s]*$";
  year = "(19[0-8][0-9]|199[0-9]|20[01][0-9]|2020)";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor() { }

  ngOnInit() {
  }

  addBook(bookDetails: any) {

    let book = bookDetails.value;
    console.log(book.bookName);

    fetch('/catalog/additem', {
      method: 'POST',
      body: JSON.stringify({
        title: book.bookName,
        description: book.description,
        image: this.imageUrl,
        isbn: book.ISBN,
        author: book.author,
        publisher: book.publication,
        category: book.category,
        year: book.relDate,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(res => {
        res.json();
        bookDetails.reset();
        this.imageUrl = "";
        this.success=true;
      })

  }

  displayImage(image) {
    if (image.target.files && image.target.files[0]) {
      console.log(image.target.files[0]);
      var reader = new FileReader();
      reader.readAsDataURL(image.target.files[0]);
      reader.onload = (image: any) => { this.imageUrl = image.target.result; };
    }

  }
}
