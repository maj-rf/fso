import { Course } from '../types/courses';

export const Content = ({ courses }: { courses: Course[] }) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <p key={course.name}>
            {course.name} {course.exerciseCount}
          </p>
        );
      })}
    </div>
  );
};
