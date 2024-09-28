import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, showUser } from '../features/userDetailSlice';
import CustomModal from './CustomModal';

const Read = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [radioData, setRadioData] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const { users, loading, searchData } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="read-container">
      {showPopup && (
        <CustomModal
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      <h2 className="title">All Data</h2>
      <div className="radio-buttons">
        <input
          className="form-check-input"
          name="gender"
          checked={radioData === ''}
          type="radio"
          onChange={() => setRadioData('')}
        />
        <label className="form-check-label">All</label>
        <input
          className="form-check-input"
          name="gender"
          checked={radioData === 'Male'}
          value="Male"
          type="radio"
          onChange={(e) => setRadioData(e.target.value)}
        />
        <label className="form-check-label">Male</label>
        <input
          className="form-check-input"
          name="gender"
          value="Female"
          checked={radioData === 'Female'}
          type="radio"
          onChange={(e) => setRadioData(e.target.value)}
        />
        <label className="form-check-label">Female</label>
      </div>

      <div className="user-list">
        {users &&
          users
            .filter((ele) => {
              if (searchData.length === 0) {
                return ele;
              } else {
                return ele.name
                  .toLowerCase()
                  .includes(searchData.toLowerCase());
              }
            })
            .filter((ele) => {
              if (radioData === 'Male') {
                return ele.gender === radioData;
              } else if (radioData === 'Female') {
                return ele.gender === radioData;
              } else return ele;
            })
            .map((ele) => (
              <div key={ele.id} className="card">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <p className="card-text">{ele.gender}</p>
                  <div className="card-actions">
                    <button
                      className="card-link"
                      onClick={() => [setId(ele.id), setShowPopup(true)]}
                    >
                      View
                    </button>
                    <Link to={`/edit/${ele.id}`} className="card-link">
                      Edit
                    </Link>
                    <Link
                      onClick={() => dispatch(deleteUser(ele.id))}
                      className="card-link delete-link"
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <style jsx>{`
        .read-container {
          padding: 20px;
          max-width: 900px;
          margin: auto;
          background: #f0f4ff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: background 0.3s;
        }

        .read-container:hover {
          background: #e6ecff;
        }

        .title {
          text-align: center;
          margin-bottom: 20px;
          font-size: 2.5rem;
          color: #333;
          font-weight: bold;
        }

        .radio-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin: 20px 0;
        }

        .user-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .card {
          background: linear-gradient(135deg, #f9f9f9, #eef2ff);
          border: none;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          padding: 20px;
        }

        .card:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
        }

        .card-body {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .card-title {
          font-size: 1.75rem;
          font-weight: bold;
          color: #007bff;
          margin-bottom: 10px;
        }

        .card-subtitle {
          color: #555;
          margin-bottom: 15px;
          font-size: 1rem;
        }

        .card-text {
          margin-bottom: 20px;
          color: #444;
          font-size: 1.1rem;
        }

        .card-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-top: 10px;
        }

        .card-link {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .card-link:hover {
          background-color: #0056b3;
        }

        .delete-link {
          background-color: #dc3545;
        }

        .delete-link:hover {
          background-color: #c82333;
        }
      `}</style>
    </div>
  );
};

export default Read;
