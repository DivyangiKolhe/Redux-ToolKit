import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../features/userDetailSlice';

const Create = () => {
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('users...', users);
    const resultAction = await dispatch(createUser(users));
    if (createUser.fulfilled.match(resultAction)) {
      console.log('User created successfully:', resultAction.payload);
    } else {
      console.error('Failed to create user:', resultAction.error.message);
    }
    navigate('/read');
  };

  return (
    <div className="create-container">
      <h2 className="title">Fill the Data</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name : </label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email : </label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Age : </label>
          <input
            type="text"
            name="age"
            className="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div className="form-group gender-group">
          <label className="form-label">Gender :</label>
          <div>
            <input
              className="form-check-input"
              name="gender"
              value="Male"
              type="radio"
              onChange={getUserData}
              required
            />
            <label className="form-check-label">Male</label>
          </div>
          <div>
            <input
              className="form-check-input"
              name="gender"
              value="Female"
              type="radio"
              onChange={getUserData}
            />
            <label className="form-check-label">Female</label>
          </div>
        </div>
        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>

      <style jsx>{`
        .create-container {
          padding: 30px;
          max-width: 600px;
          margin: auto;
          background: #edf6ff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .create-container:hover {
          transform: scale(1.02);
        }

        .title {
          text-align: center;
          margin-bottom: 20px;
          font-size: 2.5rem;
          color: #333;
          font-weight: bold;
        }

        .form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          font-weight: bold;
          margin-bottom: 8px;
          color: #555;
        }

        .form-control {
          padding: 10px;
          border: 2px solid #d0e4ff;
          border-radius: 6px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .form-control:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
        }

        .gender-group {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
        }

        .form-check-input {
          margin-right: 8px;
        }

        .btn-submit {
          padding: 12px 30px;
          background: linear-gradient(45deg, #00c6ff, #0072ff);
          color: black;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s, box-shadow 0.3s;
          width: fit-content;
          align-self: center;
        }

        .btn-submit:hover {
          background: linear-gradient(45deg, #ff416c, #ff4b2b);
          box-shadow: 0 4px 10px rgba(255, 99, 132, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Create;
