import { FilterContentPipe } from './filter-content.pipe';
import {booksData} from './books-data';
describe('FilterContentPipe', () => {
  const pipe = new FilterContentPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  describe('Bad Inputs', () => {
    it('should return the object', () => {
      const actual = pipe.transform(booksData,'3205397835','ISBN' as any);
      expect(actual).toEqual([{ISBN: 3205397835, title: "Four, The Si da ming bu", author: "Milly", releaseDate: new Date(2019,7,13), availability: true }] as any);
    });

  });

 
});


