import { Course } from '../types/courses';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const Part = ({ course }: { course: Course }) => {
  switch (course.kind) {
    case 'basic':
      return <p>{course.description}</p>;
    case 'background':
      return (
        <div>
          <p>{course.description}</p>
          <p>{course.backroundMaterial}</p>
        </div>
      );
    case 'group':
      return <div>project exercises {course.groupProjectCount}</div>;
    case 'special':
      return (
        <div>
          <p>{course.description}</p>
          {course.requirements.map((req) => (
            <div key={req}>{req}</div>
          ))}
        </div>
      );
    default:
      return assertNever(course);
  }
};
