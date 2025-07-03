import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/courses', {
        auth: {
          username: 'user',
          password: 'password',
        },
      });
      setCourses(response.data.content); 
    } catch (err) {
      console.error(err);
      setError('Failed to fetch courses.');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="course-list">
      <h2>All Courses</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {courses.map(course => (
          <li key={course.id} className="course-card">
            <div><strong>{course.name}</strong></div>
            <div>Price: {course.price} coins</div>
            {course.students && (
              <div>Enrolled Students: {course.students.length}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
