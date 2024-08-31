import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndEditStudentsComponent } from './add-and-edit-students.component';

describe('AddAndEditStudentsComponent', () => {
  let component: AddAndEditStudentsComponent;
  let fixture: ComponentFixture<AddAndEditStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAndEditStudentsComponent]
    });
    fixture = TestBed.createComponent(AddAndEditStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
