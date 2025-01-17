import React from 'react';
import { useSelector } from 'react-redux';
import './CustomModal.css';

const CustomModal = ({ id, setShowPopup }) => {
  const allusers = useSelector((state) => state.app.users);

  const singleUser = allusers.filter((ele) => ele.id === id);
  console.log('singleuser', singleUser);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setShowPopup(false)}>Close</button>
        <h2> Name: {singleUser[0].name}</h2>
        <h3> Email: {singleUser[0].email}</h3>
        <h4>Age: {singleUser[0].age}</h4>
        <p>Gender: {singleUser[0].gender}</p>
      </div>
    </div>
  );
};

export default CustomModal;
