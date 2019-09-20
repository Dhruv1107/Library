import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  book_name=['Harry Potter'];
  due_days=[10];
  start_date=['2019-09-17T06:28:12.326+00:00 '];
  return_date=[];
  images=[]
  total;
  test = {
    'username': 'dlllllllllll'
  }

  constructor() { }

  ngOnInit() {
    console.log(this.test['username']);
    fetch('/catalog/rentid/5d807cfca4fe982a2c26cf45', {
    method: 'GET',
    headers: {
  'Content-type': 'application/json; charset=UTF-8'
    }
    })
    .then(res =>res.json())
    .then(res =>{
      for(let index = res.length-1;index >= 0; index--){
        this.book_name.push(res[index].title);
        this.images.push(res[index].image);
        console.log(this.images);
        this.due_days.push(res[index].rentedBy[0].daysToRent);
        this.start_date.push(res[index].rentedBy[0].startDate.substring(0, 10));
        var tempdate = new Date();
        tempdate.setDate(new Date(this.start_date[index]).getDate() + this.due_days[index]);
        this.return_date.push(String(tempdate).substring(0, 15));
        this.total = res.length;
        console.log(this.total);

        console.log(new Date(this.start_date[index]).setDate(new Date(this.start_date[index]).getDate() + this.due_days[index]));
      }
    });
    
    }

    onClick(myIndex){
      //console.log(myIndex);
      Swal.fire({
        title: 'Return Date is ' + this.return_date[myIndex],
      })

    }
    
}


