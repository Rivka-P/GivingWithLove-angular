import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eicud } from './eicud';

describe('Eicud', () => {
  let component: Eicud;
  let fixture: ComponentFixture<Eicud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Eicud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eicud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
