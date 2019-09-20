import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {

  constructor(public modal: NgbModal) { }

  ngOnInit() {
    this.modal.open(NotificationComponent);
  }

  onClick(){

  }

}
