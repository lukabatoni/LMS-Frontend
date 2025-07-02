import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/students', {
          auth: {
            username: 'user',
            password: 'password',
          },
        });
        setStudents(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch students.');
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="student-list">
      <h2>All Students</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {students.map(student => (
          <li key={student.id}>
            <strong>{student.firstName} {student.lastName}</strong> ({student.email})<br />
            DOB: {student.dateOfBirth}, Coins: {student.coins}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;