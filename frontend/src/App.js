import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Surreal } from 'surrealdb.js';
import './App.css';

const dbConnect = async () => {
  const db = new Surreal();
  await db.connect('ws://localhost:8000/rpc', {
    ns: 'test',
    db: 'newone',
  });
  await db.signin({
    user: 'root',
    pass: 'root',
  });
  return db;
};

const fetchData = async () => {
  try {
    const db = await dbConnect();
    await db.select('notes');
    const response = await db.query('SELECT * FROM type::table($tb)', {
      tb: 'notes',
    });
    await db.close();
    return response[0].result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    content: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = await dbConnect();
      await db.create('notes', {
        name: formData.name,
        content: formData.content,
      });
      await db.close();
      mutate('notes');
      setFormData({ name: '', content: '' });
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const db = await dbConnect();
      await db.delete('notes', id);
      await db.close();
      mutate('notes', (data) => data.filter((item) => item.id !== id), false);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const { data: notes, error } = useSWR('notes', fetchData, {
    refreshInterval: 10000,
  });

  if (error) {
    return <div id='error'><p>Error loading data</p></div>;
  }

  return (
    <div id='main' className='app-container'>
      <h1 className='head'>React + NodeJS</h1>
      <h3 className='subhead'>NoteIt ( SurrealDb starter )</h3>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Note Title'
          className='input-field'
        />
        <textarea
          name='content'
          value={formData.content}
          onChange={handleChange}
          placeholder='Note Content'
          className='textarea-field'
        />
        <button type='submit' className='add-note-btn'>
          Add Note
        </button>
      </form>
      <div className='notes-container'>
        <h2>Notes:</h2>
        <ul className='notes-list'>
          {notes &&
            notes.map((item) => (
              <div key={item.id} className='note-item'>
                <h3>{item.name}</h3>
                <p>{item.content}</p>
                <button onClick={() => handleDelete(item.id)} className='delete-btn'>
                  Delete
                </button>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
