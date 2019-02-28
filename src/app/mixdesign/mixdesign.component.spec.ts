import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MixdesignComponent } from './mixdesign.component';

describe('MixdesignComponent', () => {
  let component: MixdesignComponent;
  let fixture: ComponentFixture<MixdesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MixdesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MixdesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
