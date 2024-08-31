import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndEditTrainersComponent } from './add-and-edit-trainers.component';

describe('AddAndEditTrainersComponent', () => {
  let component: AddAndEditTrainersComponent;
  let fixture: ComponentFixture<AddAndEditTrainersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAndEditTrainersComponent]
    });
    fixture = TestBed.createComponent(AddAndEditTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
