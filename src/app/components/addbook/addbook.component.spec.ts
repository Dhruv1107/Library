import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbookComponent } from './addbook.component';

describe('AddbookComponent', () => {
  let component: AddbookComponent;
  let fixture: ComponentFixture<AddbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbookComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  it('check if title has min length of 5', () => {
    let checkMinLength = component.bookForm["_directives"][1]["_rawValidators"][1].minlength
    fixture.detectChanges();
    expect(checkMinLength).toBe("5");
  });
});
