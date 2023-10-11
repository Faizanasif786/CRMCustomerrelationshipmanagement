import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import Navbar from "../Navbar";

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


  useEffect(() => {
    const dataRef = ref(database, "ScehueleRota");
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
      <Navbar />
      <div>
        <h1 className="profileData">Roster</h1>
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
                <th className="orange">Day 1</th>
                <th>Services Type</th>
                <th className="blue">Day 2</th>
                <th>Services Type</th>
                <th className="lightblue">Day 3</th>
                <th>Services Type</th>
                <th className="green">Day 4</th>
                <th>Services Type</th>

                <th className="yellow">Day 5</th>
                <th>Services Type</th>
                <th className="red">Day 6 </th>
                <th>Services Type</th>
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
  
                    <td className="Sceduledate">{Object.keys(ScehueleRota.dayInfo)[0]}</td>
                    <td className="Sceduletype">
                      {ScehueleRota.dayInfo[Object.keys(ScehueleRota.dayInfo)[0]]}
                    </td>
                    <td className="Sceduledate">{Object.keys(ScehueleRota.dayInfo)[1]}</td>
                    <td className="Sceduletype">
                      {ScehueleRota.dayInfo[Object.keys(ScehueleRota.dayInfo)[1]]}
                    </td>
                    <td className="Sceduledate">{Object.keys(ScehueleRota.dayInfo)[2]}</td>
                    <td className="Sceduletype">
                      {ScehueleRota.dayInfo[Object.keys(ScehueleRota.dayInfo)[2]]}
                    </td>
                    <td className="Sceduledate">{Object.keys(ScehueleRota.dayInfo)[3]}</td>
                    <td className="Sceduletype">
                      {ScehueleRota.dayInfo[Object.keys(ScehueleRota.dayInfo)[3]]}
                    </td>
                    <td className="Sceduledate">{Object.keys(ScehueleRota.dayInfo)[4]}</td>
                    <td className="Sceduletype">
                      {ScehueleRota.dayInfo[Object.keys(ScehueleRota.dayInfo)[4]]}
                    </td>
                    <td className="Sceduledate">{Object.keys(ScehueleRota.dayInfo)[5]}</td>
                    <td className="Sceduletype">
                      {ScehueleRota.dayInfo[Object.keys(ScehueleRota.dayInfo)[5]]}
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
