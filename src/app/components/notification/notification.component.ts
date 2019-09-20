import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  option='';
  uid = 1;
  book_name=[];
  due_days=[];
  return_date=[];
  start_date=[];
  total=[];
  count=-1;
  name ;
  customString='';
  
  constructor(public modal: NgbActiveModal,private notification:NotificationService, public router: Router) { }
  
  ngOnInit() {

    

    fetch('/catalog/rentid/5d807cfca4fe982a2c26cf45', {
    method: 'GET',
    headers: {
  'Content-type': 'application/json; charset=UTF-8'
    }
    })
    .then(res =>res.json())
    .then(res =>{
      this.name = localStorage.getItem('user');
      console.log('kranti ', this.name);
      console.log('kranti ', this.name["username"]);
      for(let index = res.length-1;index >= 0; index--){
        this.book_name.push(res[index].title);
        console.log(this.book_name[index])
        this.due_days.push(res[index].rentedBy[0].daysToRent);
        console.log(this.due_days[index]);
this.due_days.push(res[index].rentedBy[0].daysToRent);
this.start_date.push(res[index].rentedBy[0].startDate.substring(0, 10));
var tempdate = new Date();
tempdate.setDate(new Date(this.start_date[index]).getDate() + this.due_days[index]);
this.return_date.push(String(tempdate).substring(0, 15));
      }
    }); 
    
    if(this.option=='return'){
      Swal.fire({
        type: 'success',
        title: 'Returned!',
        text: 'The book has been successfully returned',
        footer: '<a href>Why do I have this issue?</a>',
        onClose: () => {
          console.log('closed :)');
          this.modal.close('Ok click')
        }
      });
    }

    else if(this.option=='already'){
      Swal.fire({
        type: 'error',
        title: 'Already Reserved!',
        text: 'Sorry, the book is not available for reservation',
        footer: '<a href>Why do I have this issue?</a>',
        onClose: () => {
          console.log('closed :)');
          this.modal.close('Ok click')
        }
      });
    }

    else if(this.option=='reserve'){
      Swal.fire({
        type: 'success',
        title: 'Reserved!',
        text: 'The book has been successfully reserved',
        onClose: () => {
          console.log('closed :)');
          this.modal.close('Ok click')
        }
      });
    }

    else if(this.option=='wrong'){
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'You have entered the wrong ISBN number',
        onClose: () => {
          console.log('closed :)');
          this.modal.close('Ok click')
        }
      });
    }

    else if(this.option=='temp'){
      this.router.navigateByUrl('dashboard');
      for(let index = 0; index < this.notification.getData().length; index++ ){
        if(this.uid == this.notification.getData()[index]['uid'])
        { 
          this.book_name.push(this.notification.getData()[index]['book_name']);
          this.return_date.push(this.notification.getData()[index]['return_date']);
          this.total.push(this.count + 1);
        }
      }
    }

    else{
      this.router.navigateByUrl('dashboard');
      let timerInterval
        Swal.fire({
          title: 'Data on the way...',
          imageUrl: 'https://static.gofugyourself.com/uploads/2019/07/reading-1564590518.gif',
          html: 'Wait for <strong></strong> milliseconds before grabbing your book!',
          timer: 3100,
          onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              Swal.getContent().querySelector('strong')
                .textContent = String(Swal.getTimerLeft()) 
            }, 100)
          },
          onClose: () => {
            clearInterval(timerInterval)
            console.log('closed :)')
          this.modal.close('Ok click')
          }
        }).then((result) => {
          if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.timer
            
          ) {
            console.log('I was closed by the timer')
            this.customString = '<ol>';
            for(let index = this.book_name.length-1;index >= 0; index--){
              this.customString = this.customString + '<li>We have reserved the book: <strong>' + this.book_name[index] + '</strong> with you. Kindly note the return date is <strong>' + this.return_date[index] + '</strong></li>';
            }
            this.customString = this.customString + '</ol>';
            console.log(this.customString);
            
            Swal.fire({
              title: "Welcome " + JSON.parse(this.name)['firstName'],
              html: this.customString,
              width: 900,
              imageUrl: 'https://elements.epam.com/content/dam/epam-elements/EPAM-Logo-animation_chosen_full-color.gif',
              imageWidth: 400,
              imageHeight: 100,
              imageAlt: 'Custom image',
              animation: false
            })
          }
        })
    }

  }


}
