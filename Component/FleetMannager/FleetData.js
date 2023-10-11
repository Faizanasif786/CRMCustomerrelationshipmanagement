import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import Navbar from '../Navbar';
import FleetModuleHeader from './FleetModuleHeader'
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
const database = getDatabase(app); // Move the database reference here

export default function RealTimeData() {
  const [formDataList, setFormDataList] = useState([]);

  useEffect(() => {
    // Set up a listener to fetch the data from the "ContactForm" reference
    const dataRef = ref(database, 'addtofleet');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const formDataArray = [];
      snapshot.forEach((childSnapshot) => {
        // Convert the childSnapshot to an object
        const formData = childSnapshot.val();
        formDataArray.push(formData);
      });
      setFormDataList(formDataArray);
    });

    // Clean up the listener when the component unmounts
    return () => {
      // Detach the listener
      unsubscribe();
    };
  }, []);

  return (
    <>
      <FleetModuleHeader  />
      <div>
        <h1 className='profileData'>Fleet Data</h1>
        {formDataList.length === 0 ? (
          <p>Data Is Loading....</p>
        ) : (
          
          <table>
            <thead>
              <tr>
               <th>suppliername</th>
               <th>make</th>
               <th>model</th>
               <th>vinno</th>
               <th>color </th>
               <th>regplate</th>
               <th>transmission</th>
               <th>serviceshistories</th>
               <th>damagehistories</th>
               <th>ActiveInactive</th>
               <th>fleetdrop</th>
               <th>otherImag</th>
               <th>otherimage2</th>

              </tr>
            </thead>
            <tbody>
              {formDataList.map((formData, index) => {
             
               
                return (
                  <tr key={index}>
                   
                    <td>{formData.suppliername}</td>
                     <td>{formData.make}</td>
                    <td>{formData.model}</td>
                    <td>{formData.vinno}</td>
                    <td>{formData.color}</td>
                    <td>{formData.regplate}</td>
                    <td>{formData.transmission}</td>
                    <td>{formData.serviceshistories}</td>
                    <td>{formData.damagehistories}</td>
                    <td>{formData.ActiveInactive}</td>
                    <td>{formData.fleetdrop}</td>
                   
                    <td>
                      {formData.otherimage && (
                        <img
                          src={formData.otherimage}
                          alt="otherimage"
                          style={{ width: '50px', height: '50px' }}
                        />
                      )}
                    </td>
                    <td>
                      {formData.otherimage2 && (
                        <img
                          src={formData.otherimage2}
                          alt="otherimage2"
                          style={{ width: '50px', height: '50px' }}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
