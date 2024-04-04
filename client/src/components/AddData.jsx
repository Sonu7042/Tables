import React, { useContext, useState } from 'react';
import userContext from '../context/UserContext';

const AddData = () => {
  const {  addData } = useContext(userContext);

  const [user, setUser] = useState({ firstName: "", lastName: "", address: "" });


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addData(user.firstName, user.lastName, user.address);
  };

  return (
    <form className='mt-4 bg-info text-center rounded' onSubmit={handleSubmit}>
      <h2 className='pt-2'>Add Entry</h2>
      <input className='m-2 rounded' type="text" name="firstName" value={user.firstName} placeholder='FirstName' onChange={handleChange} />
      <input className='m-4 rounded' type="text" name="lastName" value={user.lastName} placeholder='LastName' onChange={handleChange} />
      <input className='m-4 rounded' type="text" name="address" value={user.address} placeholder='Address' onChange={handleChange} />
      <button className='border-1 bg-primary text-white rounded w-20' type='submit'>Add</button>
    </form>
  );
};

export default AddData;
