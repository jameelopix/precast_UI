import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingActivityComponent } from './casting-activity.component';

describe('CastingActivityComponent', () => {
  let component: CastingActivityComponent;
  let fixture: ComponentFixture<CastingActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastingActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastingActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
