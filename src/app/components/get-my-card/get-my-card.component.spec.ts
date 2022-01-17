import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMyCardComponent } from './get-my-card.component';

describe('GetMyCardComponent', () => {
  let component: GetMyCardComponent;
  let fixture: ComponentFixture<GetMyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetMyCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
