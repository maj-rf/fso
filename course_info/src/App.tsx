import { Content } from './components/Content';
import { Header } from './components/Header';
import { Total } from './components/Total';
import { Course } from './types/courses';

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: Course[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;
