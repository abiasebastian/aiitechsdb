import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndEditCoursesComponent } from './add-and-edit-courses.component';

describe('AddAndEditCoursesComponent', () => {
  let component: AddAndEditCoursesComponent;
  let fixture: ComponentFixture<AddAndEditCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAndEditCoursesComponent]
    });
    fixture = TestBed.createComponent(AddAndEditCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
