import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipboardTextComponent } from './clipboard-text.component';

describe('ClipboardTextComponent', () => {
  let component: ClipboardTextComponent;
  let fixture: ComponentFixture<ClipboardTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipboardTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClipboardTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
