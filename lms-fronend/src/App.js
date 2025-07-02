import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  return (
    <Router>
      <nav style={{ padding: '20px', backgroundColor: '#eee' }}>
        <Link to="/students" style={{ marginRight: '15px' }}>View All Students</Link>
        <Link to="/students/create">Create Student</Link>
      </nav>

      <Routes>
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/create" element={<StudentForm />} />
        <Route path="*" element={<p style={{ padding: '20px' }}>404 Page Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
