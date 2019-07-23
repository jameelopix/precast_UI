import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionPlanReportComponent } from './production-plan-report.component';

describe('ProductionPlanReportComponent', () => {
  let component: ProductionPlanReportComponent;
  let fixture: ComponentFixture<ProductionPlanReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionPlanReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionPlanReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
