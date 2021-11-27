import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CjFormComponent } from './cj-form.component';

describe('CjFormComponent', () => {
  let component: CjFormComponent;
  let fixture: ComponentFixture<CjFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CjFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CjFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
