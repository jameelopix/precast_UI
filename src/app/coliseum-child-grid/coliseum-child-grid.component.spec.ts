import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColiseumChildGridComponent } from './coliseum-child-grid.component';

describe('ColiseumChildGridComponent', () => {
  let component: ColiseumChildGridComponent;
  let fixture: ComponentFixture<ColiseumChildGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColiseumChildGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColiseumChildGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
