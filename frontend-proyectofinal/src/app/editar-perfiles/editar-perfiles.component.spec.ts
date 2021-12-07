import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPerfilesComponent } from './editar-perfiles.component';

describe('EditarPerfilesComponent', () => {
  let component: EditarPerfilesComponent;
  let fixture: ComponentFixture<EditarPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPerfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
