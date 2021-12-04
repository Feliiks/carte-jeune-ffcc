import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteJeuneNumeriqueComponent } from './carte-jeune-numerique.component';

describe('CarteJeuneNumeriqueComponent', () => {
  let component: CarteJeuneNumeriqueComponent;
  let fixture: ComponentFixture<CarteJeuneNumeriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarteJeuneNumeriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteJeuneNumeriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
