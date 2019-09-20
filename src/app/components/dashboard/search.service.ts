import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SearchService {
	searchData: string = '';
	booksData = [];
	fieldSearch: string = 'isbn';
	constructor() {}

	getData():void {
		fetch('https://library-fccj.herokuapp.com/catalog/', {
				method: 'GET',
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			})
				.then((res) => res.json())
				.then((data) => {
					this.booksData = data;
					console.log(this.booksData);
				});
	}

	setData(searchData: string) {
		this.searchData = searchData;
	}

	setField(fieldSearch: string) {
		this.fieldSearch = fieldSearch;
	}

	resetInput() {
		this.searchData = "";
		this.fieldSearch = "isbn";
	}
}
