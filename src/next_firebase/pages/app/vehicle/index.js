import { useState } from 'react';
import {getDatabase, ref, push, remove } from 'firebase/database';
import {db} from '@/lib/firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


function RegisterVehicle() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
// Generate a GUID
const id = uuidv4();
    // Create a new vehicle object
    const vehicle = {
      id,
      make,
      model,
      year,
    };

    // Save the vehicle data to Firebase
    
    const database = getDatabase();
    const dataRef = ref(database, 'path/to/data');
    push(dataRef, vehicle)
    .then(() => {
      toast.success('Data saved successfully!', { position: toast.POSITION.TOP_RIGHT });
    })
    .catch((error) => {
      toast.error('Failed to save data.', { position: toast.POSITION.TOP_RIGHT });
      console.error(error);
    });
    
    // Reset the form fields
    setMake('');
    setModel('');
    setYear('');
  };
 
  return (
    <div>
      <h1>Register Vehicle</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="make">Make:</label>
        <input type="text" id="make" value={make} onChange={(e) => setMake(e.target.value)} />

        <label htmlFor="model">Model:</label>
        <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} />

        <label htmlFor="year">Year:</label>
        <input type="text" id="year" value={year} onChange={(e) => setYear(e.target.value)} />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterVehicle;
