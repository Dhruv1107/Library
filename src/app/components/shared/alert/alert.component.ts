import { Component, OnInit, Input } from '@angular/core';
import { AlertError } from 'src/app/model/AlertError';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input('errorData') errorData: AlertError;
  constructor() { }

  ngOnInit() {
  }

}
