import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyCardComponent } from './edit-my-card.component';

describe('EditMyCardComponent', () => {
  let component: EditMyCardComponent;
  let fixture: ComponentFixture<EditMyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMyCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
