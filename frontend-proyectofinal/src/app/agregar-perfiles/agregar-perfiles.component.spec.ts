import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPerfilesComponent } from './agregar-perfiles.component';

describe('AgregarPerfilesComponent', () => {
  let component: AgregarPerfilesComponent;
  let fixture: ComponentFixture<AgregarPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPerfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
