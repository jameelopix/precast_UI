import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAmountDetailsComponent } from './item-amount-details.component';

describe('ItemAmountDetailsComponent', () => {
  let component: ItemAmountDetailsComponent;
  let fixture: ComponentFixture<ItemAmountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAmountDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAmountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
