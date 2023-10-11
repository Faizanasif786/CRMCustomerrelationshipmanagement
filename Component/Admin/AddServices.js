import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';

// Your Firebase configuration
const firebaseConfig = {
     apiKey: "AIzaSyCTx_3eqVT0URoasobI1DDcsezpu5AYkiI",
     authDomain: "crm-backend-cabb3.firebaseapp.com",
     databaseURL: "https://crm-backend-cabb3-default-rtdb.firebaseio.com",
     projectId: "crm-backend-cabb3",
     storageBucket: "crm-backend-cabb3.appspot.com",
     messagingSenderId: "797388480962",
     appId: "1:797388480962:web:2dfce140d39330eb6bf65b",
     measurementId: "G-RY90BSPDV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function AddServices() {
  const [servicesData, setServicesData] = useState([]);
  const [service, setService] = useState('');
  const [rate, setRate] = useState('');

  useEffect(() => {
    // Get a reference to the Realtime Database
    const database = getDatabase();
    const servicesRef = ref(database, 'services');

    // Set up a listener to fetch the data from the "services" reference
    onValue(servicesRef, (snapshot) => {
      const servicesArray = [];
      snapshot.forEach((childSnapshot) => {
        // Convert the childSnapshot to an object and add it to the servicesArray
        const serviceData = childSnapshot.val();
        servicesArray.push(serviceData);
      });
      setServicesData(servicesArray);
    });

    // Clean up the listener when the component unmounts
    return () => {
      // Detach the listener
      onValue(servicesRef, null);
    };
  }, []);

  const handleAddService = () => {
    if (service && rate) {
      // Add the new service to the existing data
      setServicesData((prevData) => [...prevData, { service, rate }]);
      // Clear the input fields
      setService('');
      setRate('');

      // Get a reference to the Realtime Database
      const database = getDatabase();
      const servicesRef = ref(database, 'services');

      // Push the new service data to the "services" reference in Firebase
      push(servicesRef, { service, rate });
    }
  };

  return (
    <>
      <Navbar />
      <center>
        <div>
          <h1>Rate Card</h1>
          <div className="add-services">
            <input
              type="text"
              name="services"
              placeholder="Enter Your Services"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            />
            <br /> <br />
            <input
              type="text"
              name="services rate"
              placeholder="Enter Services Rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              required
            />
            <br /> <br />
            <button id="Add" onClick={handleAddService}>
              Add
            </button>
          </div>
        </div>
      </center>

      {servicesData.length > 0 && (
        <div className="services-data-display">
          <h2>Here is add service data</h2>
          <table>
            <thead>
              <tr>
                <th>Service Type</th>
                <th>Unit Rate</th>
              </tr>
            </thead>
            <tbody>
              {servicesData.map((data, index) => (
                <tr key={index}>
                  <td>{data.service}</td>
                  <td>{data.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
