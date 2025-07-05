import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import CourseList from './components/CourseList';
import LessonList from './components/LessonList'; 

function App() {
  return (
    <Router>
<nav style={{ padding: '20px', backgroundColor: '#eee' }}>
  <Link to="/students" style={{ marginRight: '15px' }}>View Students</Link>
  <Link to="/students/create" style={{ marginRight: '15px' }}>Create Student</Link>
  <Link to="/courses" style={{ marginRight: '15px' }}>View Courses</Link>
  <Link to="/lessons">View Lessons</Link> 
</nav>

<Routes>
  <Route path="/students" element={<StudentList />} />
  <Route path="/students/create" element={<StudentForm />} />
  <Route path="/courses" element={<CourseList />} />
  <Route path="/lessons" element={<LessonList />} />
  <Route path="*" element={<p style={{ padding: '20px' }}>404 Page Not Found</p>} />
</Routes>
    </Router>
  );
}

export default App;
