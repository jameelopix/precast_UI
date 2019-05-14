import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColiseumGridComponent } from './coliseum-grid.component';

describe('ColiseumGridComponent', () => {
  let component: ColiseumGridComponent;
  let fixture: ComponentFixture<ColiseumGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColiseumGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColiseumGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
