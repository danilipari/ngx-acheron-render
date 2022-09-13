import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheronComponent } from './acheron.component';

describe('AcheronComponent', () => {
  let component: AcheronComponent;
  let fixture: ComponentFixture<AcheronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcheronComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcheronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
