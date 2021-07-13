import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRealtyComponent } from './new-realty.component';

describe('NewRealtyComponent', () => {
  let component: NewRealtyComponent;
  let fixture: ComponentFixture<NewRealtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRealtyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRealtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
