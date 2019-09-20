import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  data = [
    {uid: 1, book_name: 'ULYSSES', return_date: '20-09-2019'},
    {uid: 2, book_name: 'THE GREAT GATSBY', return_date: '19-09-2019'},
    {uid: 3, book_name: 'A PORTRAIT OF THE ARTIST AS A YOUNG MAN', return_date: '1-10-2019'},
    {uid: 4, book_name: 'LOLITA', return_date: '22-09-2019'},
    {uid: 6, book_name: 'BRAVE NEW WORLD', return_date: '19-09-2019'},
    {uid: 6, book_name: 'THE SOUND AND THE FURY', return_date: '18-09-2019'},
    {uid: 2, book_name: 'CATCH-22', return_date: '23-09-2019'},
    {uid: 8, book_name: 'DARKNESS AT NOON', return_date: '29-09-2019'},
    {uid: 1, book_name: 'SONS AND LOVERS', return_date: '27-09-2019'},
    {uid: 10, book_name: 'THE GRAPES OF WRATH', return_date: '22-09-2019'}
];

  constructor() { }
  getData(){
    return this.data;
  }
}
