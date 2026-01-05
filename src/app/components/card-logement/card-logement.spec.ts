import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLogement } from './card-logement';

describe('CardLogement', () => {
  let component: CardLogement;
  let fixture: ComponentFixture<CardLogement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLogement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLogement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
