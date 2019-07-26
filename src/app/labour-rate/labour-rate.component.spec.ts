import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourRateComponent } from './labour-rate.component';

describe('LabourRateComponent', () => {
  let component: LabourRateComponent;
  let fixture: ComponentFixture<LabourRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
