import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosperfilesComponent } from './todosperfiles.component';

describe('TodosperfilesComponent', () => {
  let component: TodosperfilesComponent;
  let fixture: ComponentFixture<TodosperfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosperfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosperfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
