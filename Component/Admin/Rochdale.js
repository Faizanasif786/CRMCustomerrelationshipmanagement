import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import Navbar from '../Navbar'
// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTx_3eqVT0URoasobI1DDcsezpu5AYkiI",
  authDomain: "crm-backend-cabb3.firebaseapp.com",
  databaseURL: "https://crm-backend-cabb3-default-rtdb.firebaseio.com",
  projectId: "crm-backend-cabb3",
  storageBucket: "crm-backend-cabb3.appspot.com",
  messagingSenderId: "797388480962",
  appId: "1:797388480962:web:2dfce140d39330eb6bf65b",
  measurementId: "G-RY90BSPDV0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Move the database reference here

export default function RealTimeData() {
  const [ScehueleRotaList, setScehueleRotaList] = useState([]);
  // const [ScehueleRotaList, setScehueleRotaList] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSiteButtonClick = (site) => {
    // Use navigate to navigate to the desired route
    navigate(`/${site.toLowerCase()}`);
  }; 

  useEffect(() => {
    const dataRef = ref(database, "RochdaleScehueleRota");
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const transportDataMap = new Map();

      snapshot.forEach((childSnapshot) => {
        const scheduleData = childSnapshot.val();
        const transportId = scheduleData.transportId;

        if (!transportDataMap.has(transportId)) {
          transportDataMap.set(transportId, {
            drivefirstname: scheduleData.drivefirstname,
            drivelastname: scheduleData.drivelastname,
            transportId: scheduleData.transportId,
            site: scheduleData.site,
            days: [],
          });
        }

        transportDataMap.get(transportId).days.push({
          date: scheduleData.date,
          serviceType: scheduleData.services,
        });
      });

      const combinedScehueleRotaList = Array.from(
        transportDataMap.values()
      ).map((data) => ({
        ...data,
        dayInfo: data.days.reduce((acc, day) => {
          acc[day.date] = day.serviceType;
          return acc;
        }, {}),
      }));

      setScehueleRotaList(combinedScehueleRotaList);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log(ScehueleRotaList)

  return (
    <>
    <Navbar  />
    <div id='SiteButton'>
        <button  onClick={() => handleSiteButtonClick('ALayland')}>
          Leyland
        </button>
        <button  onClick={() => handleSiteButtonClick('Manchester')}>Manchester</button>
        <button className='leyland' onClick={() => handleSiteButtonClick('Rochdale')}>Rochdale</button>
        <button  onClick={() => handleSiteButtonClick('Bolton')}>Bolton</button>
      </div>
      <div>

        {ScehueleRotaList.length === 0 ? (
          <p>Available Data</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Transport ID</th>
                <th>Site </th>
                
              </tr>
            </thead>
            <tbody>
              {ScehueleRotaList.map((ScehueleRota, index) => {
                // Calculate the number of days from the joining date till today
                console.log(ScehueleRota)
                return (
                  <tr key={index}>
                    <td>{ScehueleRota.drivefirstname}</td>
                    <td>{ScehueleRota.drivelastname}</td>
                    <td>{ScehueleRota.transportId}</td>
                    <td>{ScehueleRota.site}</td>
  
                 
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
