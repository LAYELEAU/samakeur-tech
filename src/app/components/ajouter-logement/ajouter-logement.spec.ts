import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterLogement } from './ajouter-logement';

describe('AjouterLogement', () => {
  let component: AjouterLogement;
  let fixture: ComponentFixture<AjouterLogement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterLogement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterLogement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
