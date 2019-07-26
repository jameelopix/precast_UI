import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourWorkEntryComponent } from './labour-work-entry.component';

describe('LabourWorkEntryComponent', () => {
  let component: LabourWorkEntryComponent;
  let fixture: ComponentFixture<LabourWorkEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourWorkEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourWorkEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
