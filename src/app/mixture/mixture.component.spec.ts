import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MixtureComponent } from './mixture.component';

describe('MixtureComponent', () => {
  let component: MixtureComponent;
  let fixture: ComponentFixture<MixtureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MixtureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
