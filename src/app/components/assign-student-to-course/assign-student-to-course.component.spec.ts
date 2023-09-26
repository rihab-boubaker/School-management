import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignStudentToCourseComponent } from './assign-student-to-course.component';

describe('AssignStudentToCourseComponent', () => {
  let component: AssignStudentToCourseComponent;
  let fixture: ComponentFixture<AssignStudentToCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignStudentToCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignStudentToCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
