import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtoroomComponent } from './addtoroom.component';

describe('AddtoroomComponent', () => {
  let component: AddtoroomComponent;
  let fixture: ComponentFixture<AddtoroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtoroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtoroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
