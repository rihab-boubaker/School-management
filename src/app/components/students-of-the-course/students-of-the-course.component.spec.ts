import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsOfTheCourseComponent } from './students-of-the-course.component';

describe('StudentsOfTheCourseComponent', () => {
  let component: StudentsOfTheCourseComponent;
  let fixture: ComponentFixture<StudentsOfTheCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsOfTheCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsOfTheCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
