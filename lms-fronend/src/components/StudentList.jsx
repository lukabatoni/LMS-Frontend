import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

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

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this student?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:8080/api/v1/students/${id}`, {
        auth: {
          username: 'user',
          password: 'password',
        },
      });
      setStudents(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete student.');
    }
  };

  useEffect(() => {
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
            <br />
            <button onClick={() => handleDelete(student.id)} style={{ marginTop: '6px', backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '6px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
