import { Course } from '../types/courses';
import { Part } from './Part';

export const Content = ({ courses }: { courses: Course[] }) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.name}>
            <h3>
              {course.name} {course.exerciseCount}
            </h3>
            <Part course={course} />
          </div>
        );
      })}
    </div>
  );
};
