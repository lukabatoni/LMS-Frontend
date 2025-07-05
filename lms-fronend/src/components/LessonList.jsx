import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LessonList.css';

const LessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState('');

  const fetchLessons = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/lessons', {
        auth: {
          username: 'user',
          password: 'password',
        },
      });
      setLessons(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch lessons.');
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <div className="lesson-list">
      <h2>All Lessons</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {lessons.map((lesson, index) => (
          <li key={index} className="lesson-card">
            <div><strong>Title:</strong> {lesson.title}</div>
            <div><strong>Duration:</strong> {lesson.duration} hours</div>
            <div><strong>Course ID:</strong> {lesson.courseId}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;
