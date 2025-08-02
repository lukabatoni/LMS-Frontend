import React, { useState } from 'react';
import axios from 'axios';
import './CourseForm.css';

const CourseForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    coinsPaid: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/v1/courses', {
        ...form,
        price: parseFloat(form.price),
        coinsPaid: parseFloat(form.coinsPaid)
      }, {
        auth: {
          username: 'user',
          password: 'password'
        }
      });

      setMessage('Course created successfully!');
      setForm({ title: '', description: '', price: '', coinsPaid: '' });
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to create course');
    }
  };

  return (
    <div className="course-form-container">
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          maxLength={20}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          maxLength={1000}
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          min={0.01}
        />
        <input
          name="coinsPaid"
          type="number"
          step="0.01"
          placeholder="Coins Paid"
          value={form.coinsPaid}
          onChange={handleChange}
          required
          min={0}
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CourseForm;
