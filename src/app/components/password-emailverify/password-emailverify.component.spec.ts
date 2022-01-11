import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordEmailverifyComponent } from './password-emailverify.component';

describe('PasswordEmailverifyComponent', () => {
  let component: PasswordEmailverifyComponent;
  let fixture: ComponentFixture<PasswordEmailverifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordEmailverifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordEmailverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
