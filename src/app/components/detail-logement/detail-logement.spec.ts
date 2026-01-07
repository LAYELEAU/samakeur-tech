import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLogement } from './detail-logement';

describe('DetailLogement', () => {
  let component: DetailLogement;
  let fixture: ComponentFixture<DetailLogement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailLogement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailLogement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
