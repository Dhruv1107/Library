import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertError } from 'src/app/model/AlertError';
import { ReservationService } from '../../Reservation/reservation.service';
import { SearchService } from '../search.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: [ './search.component.css' ]
})
export class SearchComponent implements OnInit {
	constructor(public rs: ReservationService, public ss: SearchService) {}
	@ViewChild('inputSearch', { static: false })
	inputSearch: ElementRef;
	fieldSearch: string;
	searchData: string = '';
	booksData = [];
	numberOfElementsInSearch: number = 0;
	errorData: AlertError;

	searchFields: string[] = [ 'isbn', 'title', 'author', 'year', 'Availability' ];
	displayFields: string[] = [ 'isbn', 'title', 'author' ];
	ngOnInit() {
		this.errorData = new AlertError('alert-danger', 'No books');
		this.searchData = this.ss.searchData;
		this.fieldSearch = this.ss.fieldSearch;
		this.ss.getData();
	}
	resetSearch(): void {
		this.inputSearch.nativeElement.value = '';
		this.searchData = '';
		this.ss.setField(this.fieldSearch);
	}
	reserveBook(book) {
		this.rs.reserveBook(book);
  }
  
}
