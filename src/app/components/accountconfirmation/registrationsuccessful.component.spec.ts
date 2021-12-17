import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationsuccessfulComponent } from './registrationsuccessful.component';

describe('RegistrationsuccessfulComponent', () => {
  let component: RegistrationsuccessfulComponent;
  let fixture: ComponentFixture<RegistrationsuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationsuccessfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationsuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
