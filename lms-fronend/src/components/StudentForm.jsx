import React, { useState } from 'react';
import axios from 'axios';
import './StudentForm.css';

const StudentForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    coins: '',
    locale: 'EN',
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:8080/api/v1/students',
        {
          ...form,
          coins: parseFloat(form.coins),
        },
        {
          auth: {
            username: 'user',
            password: 'password',
          },
        }
      );

      setMessage('Student created successfully!');
      setIsSuccess(true);
    } catch (error) {
      setMessage('Failed to create student');
      setIsSuccess(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Create Student</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="dateOfBirth" type="date" onChange={handleChange} required />
        <input name="coins" placeholder="Coins" type="number" onChange={handleChange} required />
        <select name="locale" onChange={handleChange} required>
          <option value="EN">EN</option>
          <option value="GE">GE</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <p className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</p>
    </div>
  );
};

export default StudentForm;
