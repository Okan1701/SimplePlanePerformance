import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInputTitleComponent } from './card-input-title.component';

describe('CardInputTitleComponent', () => {
  let component: CardInputTitleComponent;
  let fixture: ComponentFixture<CardInputTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardInputTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInputTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
