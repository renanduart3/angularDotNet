import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalestranteComponent } from './palestrante.component';

describe('PalestranteComponent', () => {
  let component: PalestranteComponent;
  let fixture: ComponentFixture<PalestranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalestranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalestranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
