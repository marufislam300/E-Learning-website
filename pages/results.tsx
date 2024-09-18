import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/ResultsPage.module.css';

interface Result {
  _id: string;
  studentEmail: string;
  quizId: string;
  result: number;
  courseId: string;
  createdAt: Date;
}

interface Quiz {
  _id: string;
  quizName: string;
}

interface Course {
  _id: string;
  name: string;
}

const ResultsPage = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = localStorage.getItem('userData');
        if (!storedData) {
          throw new Error('User data not found');
        }
        const userData = JSON.parse(storedData);
        setStudentName(userData.name);
        setStudentEmail(userData.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login'); // Redirect to login if user data is not found
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (studentEmail) {
      const fetchResults = async () => {
        try {
          const response = await fetch(`/api/auth/results?email=${encodeURIComponent(studentEmail)}`);
          const data = await response.json();
          setResults(data.results);
        } catch (error) {
          console.error('Error fetching results:', error);
        }
      };

      const fetchCourses = async () => {
        try {
          const response = await fetch('/api/auth/courses2');
          const data = await response.json();
          setCourses(data.courses);
          console.log('Fetched courses:', data.courses);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };

      const fetchQuizzes = async () => {
        try {
          const response = await fetch('/api/auth/quizzes1');
          const data = await response.json();
          setQuizzes(data.quizzes);
        } catch (error) {
          console.error('Error fetching quizzes:', error);
        }
      };

      fetchResults();
      fetchCourses();
      fetchQuizzes();
    }
  }, [studentEmail]);

  const getCourseName = (courseId: string): string => {
    const course = courses.find(c => c._id === courseId);
    return course ? course.name : 'Unknown Course';
  };
  
  const getQuizName = (quizId: string): string => {
    const quiz = quizzes.find(q => q._id === quizId);
    return quiz ? quiz.quizName : 'Unknown Quiz';
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quiz Results for: {studentName} ({studentEmail})</h1>
      <table className={styles.resultsTable}>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Quiz Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result._id}>
              <td>{getCourseName(result.courseId)}</td>
              <td>{getQuizName(result.quizId)}</td>
              <td>{result.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsPage;
