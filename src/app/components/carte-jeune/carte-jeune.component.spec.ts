import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteJeuneComponent } from './carte-jeune.component';

describe('CarteJeuneComponent', () => {
  let component: CarteJeuneComponent;
  let fixture: ComponentFixture<CarteJeuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarteJeuneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteJeuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
