
import React, { useState } from "react";
import Navbar from "../Navbar";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, push } from "firebase/database";

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

export default function SceheduleRota() {
  // Get a reference to the Firestore database
  const db = getFirestore(app);

  // Get a reference to the Realtime Database
  const database = getDatabase(app);
  const [ScehueleRota, setScehueleRota] = useState({
    dayonedate: "",
    daytwodate: "",
    daythreedate: "",
    dayfourdate: "",
    dayfivedate: "",
    daysixdate: "",
    drivefirstname: "",
    drivelastname: "",
    transportId: "",

    site: "",
    servicestypeday1: "",
    servicestypeday2: "",
    servicestypeday3: "",
    servicestypeday4: "",
    servicestypeday5: "",
    servicestypeday6: "",
  });

  // const [dayone, setDayone] = useState({})
  // const [daytwo, setDaytwo] = useState({})
  // const [daythree, setDaythree] = useState({})
  // const [dayfour, setDayfour] = useState({})
  // const [dayfive, setDayfive] = useState({})
  // const [daysix, setDaysix] = useState({})
  // const [remainingdata, setRemainingdata] = useState({})


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScehueleRota((prevScehueleRota) => ({
      ...prevScehueleRota,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Determine the name of the input field (e.g., image, imageinsurancecard, etc.)
      const fieldName = e.target.name;

      // Set the image data in base64 format to the respective ScehueleRota state field
      setScehueleRota((prevScehueleRota) => ({
        ...prevScehueleRota,
        [fieldName]: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any required field is blank
    const requiredFields = [
      "dayonedate",
      "daytwodate",
      "daythreedate",
      "dayfourdate",
      "dayfivedate",
      "daysixdate",
      "transportId",

      "site",
      "drivefirstname",
      "drivelastname",
      "servicestypeday1",
      "servicestypeday2",
      "servicestypeday3",
      "servicestypeday4",
      "servicestypeday5",
      "servicestypeday6",

      // Add other required fields here
    ];

    // Create an array of day objects
  const daysData = [
    { name: "dayonedate", serviceType: "servicestypeday1", day: "1" },
    { name: "daytwodate", serviceType: "servicestypeday2", day: "2" },
    { name: "daythreedate", serviceType: "servicestypeday3", day: "3" },
    { name: "dayfourdate", serviceType: "servicestypeday4", day: "4" },
    { name: "dayfivedate", serviceType: "servicestypeday5", day: "5" },
    { name: "daysixdate", serviceType: "servicestypeday6",  day: "6" },
  ];


  // Loop through each day's data and validate required fields
  const dataToSend = daysData.map((day) => {
    const dayData = {
      transportId: ScehueleRota.transportId,
      drivefirstname: ScehueleRota.drivefirstname,
      drivelastname: ScehueleRota.drivelastname,
      site: ScehueleRota.site,
      date: ScehueleRota[day.name],
      services: ScehueleRota[day.serviceType],
      day: day.day,
    };

    // Check if any required field is blank for the current day
    // const isAnyFieldBlank = requiredFields.some((field) => !dayData[field]);
    // if (isAnyFieldBlank) {
    //   allFieldsFilled = false;
    // }

    return dayData;
  });

  // if (!allFieldsFilled) {
  //   alert("Please fill all the given fields for each day.");
  // } else {
  //   alert("Add Successful!");

    // Loop through the dataToSend array and push data to Realtime Database for each day
    dataToSend.forEach(async (dayData) => {
      await push(ref(database, "ScehueleRota"), dayData);
    });

      setScehueleRota({
        dayonedate: "",
        daytwodate: "",
        daythreedate: "",
        dayfourdate: "",
        dayfivedate: "",
        daysixdate: "",
        transportId: "",

        site: "",
        drivefirstname: "",
        drivelastname: "",
        servicestypeday1: "",
        servicestypeday2: "",
        servicestypeday3: "",
        servicestypeday4: "",
        servicestypeday5: "",
        servicestypeday6: "",
      });
    
  };

  return (
    <>
      <Navbar />
      <div className="driver-registration-heading">
        <h1>Scehedule Rota </h1>
      </div>
      <div id="profile-Form">
        <form>
          <input
            type="text"
            name="drivefirstname"
            placeholder="Enter Driver Name"
            value={ScehueleRota.drivefirstname}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="drivelastname"
            placeholder="Enter Driver Last Name"
            value={ScehueleRota.drivelastname}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="transportId"
            placeholder="Enter Transport Id"
            value={ScehueleRota.transportId}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="site"
            placeholder="Enter site name"
            value={ScehueleRota.site}
            onChange={handleInputChange}
          />
          <label for="">Day 1</label>
          <input
            type="date"
            name="dayonedate"
            placeholder="Enter Date Of Joining"
            value={ScehueleRota.dayonedate}
            onChange={handleInputChange}
          />

          <select
            name="servicestypeday1"
            value={ScehueleRota.servicestypeday1}
            onChange={handleInputChange}
          >
            <option value="">Services Type</option>
            <option value="Standard Parcel - 9 Hr">
              Standard Parcel - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr 30 Mins">
              Standard Parcel - 9 Hr 30 Mins
            </option>
            <option value="Standard Parcel Large Van - 9 Hr">
              Standard Parcel Large Van - 9 Hr
            </option>
            <option value="Standard Parcel Large Van - 9 Hr 30 Mins">
              Standard Parcel Large Van - 9 Hr 30 Mins
            </option>
            <option value="Remote Debrief - 9 Hr">Remote Debrief - 9 Hr</option>
            <option value="Nursery Route Level 1 - 9 Hr">
              Nursery Route Level 1 - 9 Hr
            </option>
            <option value="Nursery Route Level 2 - 9 Hr">
              Nursery Route Level 2 - 9 Hr
            </option>
            <option value="Classroom Training">Classroom Training</option>
            <option value="Ride Along">Ride Along</option>
            <option value="Rescue 2">Rescue 2</option>
            <option value="Rescue 4">Rescue 4 </option>
            <option value="Rescue 6 / Missort Delivery - 6 Hr">
              Rescue 6 / Missort Delivery - 6 Hr
            </option>
            <option value="MFN Standard Full Van - 4 Hr">
              MFN Standard Full Van - 4 Hr
            </option>
            <option value="MFN Standard Full Van - 5 Hr">
              MFN Standard Full Van - 5 Hr
            </option>
            <option value="MFN Standard Full Van - 6 Hr">
              MFN Standard Full Van - 6 Hr
            </option>
            <option value="MFN Standard Full Van - 8 Hr">
              MFN Standard Full Van - 8 Hr
            </option>
            <option value="MFN Standard Full Van - 9 Hr">
              MFN Standard Full Van - 9 Hr
            </option>
            <option value="MFN Luton VAN - 4 Hr">MFN Luton VAN - 4 Hr</option>
            <option value="MFN Luton VAN - 6 Hr">MFN Luton VAN - 6 Hr</option>
            <option value="MFN Pickup Large Full Van - 4 Hr">
              MFN Pickup Large Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 5 Hr">
              MFN Pickup Large Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 6 Hr">
              MFN Pickup Large Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 8 Hr">
              MFN Pickup Large Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 9 Hr">
              MFN Pickup Large Full Van - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr">
              Standard Parcel - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr 30 Mins">
              Standard Parcel - 9 Hr 30 Mins
            </option>
            <option value="Standard Parcel Large Van - 9 Hr">
              Standard Parcel Large Van - 9 Hr
            </option>
            <option value="Standard Parcel Large Van - 9 Hr 30 Mins">
              Standard Parcel Large Van - 9 Hr 30 Mins
            </option>
            <option value="Remote Debrief - 9 Hr">Remote Debrief - 9 Hr</option>
            <option value="Nursery Route Level 1 - 9 Hr">
              Nursery Route Level 1 - 9 Hr
            </option>
            <option value="Nursery Route Level 2 - 9 Hr">
              Nursery Route Level 2 - 9 Hr
            </option>
            <option value="Classroom Training">Classroom Training</option>
            <option value="Ride Along">Ride Along</option>
            <option value="Rescue 2">Rescue 2</option>
            <option value="Rescue 4">Rescue 4</option>
            <option value="Rescue 6 / Missort Delivery - 6 Hr">
              Rescue 6 / Missort Delivery - 6 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 4 Hr">
              MFN Pickup Standard Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 5 Hr">
              MFN Pickup Standard Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 6 Hr">
              MFN Pickup Standard Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 8 Hr">
              MFN Pickup Standard Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 9 Hr">
              MFN Pickup Standard Full Van - 9 Hr
            </option>
            <option value="MFN Pickup Luton VAN - 4 Hr">
              MFN Pickup Luton VAN - 4 Hr
            </option>
            <option value="MFN Pickup Luton VAN - 6 Hr">
              MFN Pickup Luton VAN - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 4 Hr">
              MFN Pickup Large Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 5 Hr">
              MFN Pickup Large Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 6 Hr">
              MFN Pickup Large Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 8 H">
              MFN Pickup Large Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 9 Hr">
              MFN Pickup Large Full Van - 9 Hr
            </option>
          </select>

          {/* day 1 end  */}

          {/* day 2 start  */}

          <label for="">Day 2</label>
          <input
            type="date"
            name="daytwodate"
            placeholder="Enter Date Of Joining"
            value={ScehueleRota.daytwodate}
            onChange={handleInputChange}
          />

          <select
            name="servicestypeday2"
            value={ScehueleRota.servicestypeday2}
            onChange={handleInputChange}
          >
            <option value="">Services Type</option>
            <option value="Standard Parcel - 9 Hr">
              Standard Parcel - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr 30 Mins">
              Standard Parcel - 9 Hr 30 Mins
            </option>
            <option value="Standard Parcel Large Van - 9 Hr">
              Standard Parcel Large Van - 9 Hr
            </option>
            <option value="Standard Parcel Large Van - 9 Hr 30 Mins">
              Standard Parcel Large Van - 9 Hr 30 Mins
            </option>
            <option value="Remote Debrief - 9 Hr">Remote Debrief - 9 Hr</option>
            <option value="Nursery Route Level 1 - 9 Hr">
              Nursery Route Level 1 - 9 Hr
            </option>
            <option value="Nursery Route Level 2 - 9 Hr">
              Nursery Route Level 2 - 9 Hr
            </option>
            <option value="Classroom Training">Classroom Training</option>
            <option value="Ride Along">Ride Along</option>
            <option value="Rescue 2">Rescue 2</option>
            <option value="Rescue 4">Rescue 4 </option>
            <option value="Rescue 6 / Missort Delivery - 6 Hr">
              Rescue 6 / Missort Delivery - 6 Hr
            </option>
            <option value="MFN Standard Full Van - 4 Hr">
              MFN Standard Full Van - 4 Hr
            </option>
            <option value="MFN Standard Full Van - 5 Hr">
              MFN Standard Full Van - 5 Hr
            </option>
            <option value="MFN Standard Full Van - 6 Hr">
              MFN Standard Full Van - 6 Hr
            </option>
            <option value="MFN Standard Full Van - 8 Hr">
              MFN Standard Full Van - 8 Hr
            </option>
            <option value="MFN Standard Full Van - 9 Hr">
              MFN Standard Full Van - 9 Hr
            </option>
            <option value="MFN Luton VAN - 4 Hr">MFN Luton VAN - 4 Hr</option>
            <option value="MFN Luton VAN - 6 Hr">MFN Luton VAN - 6 Hr</option>
            <option value="MFN Pickup Large Full Van - 4 Hr">
              MFN Pickup Large Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 5 Hr">
              MFN Pickup Large Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 6 Hr">
              MFN Pickup Large Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 8 Hr">
              MFN Pickup Large Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 9 Hr">
              MFN Pickup Large Full Van - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr">
              Standard Parcel - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr 30 Mins">
              Standard Parcel - 9 Hr 30 Mins
            </option>
            <option value="Standard Parcel Large Van - 9 Hr">
              Standard Parcel Large Van - 9 Hr
            </option>
            <option value="Standard Parcel Large Van - 9 Hr 30 Mins">
              Standard Parcel Large Van - 9 Hr 30 Mins
            </option>
            <option value="Remote Debrief - 9 Hr">Remote Debrief - 9 Hr</option>
            <option value="Nursery Route Level 1 - 9 Hr">
              Nursery Route Level 1 - 9 Hr
            </option>
            <option value="Nursery Route Level 2 - 9 Hr">
              Nursery Route Level 2 - 9 Hr
            </option>
            <option value="Classroom Training">Classroom Training</option>
            <option value="Ride Along">Ride Along</option>
            <option value="Rescue 2">Rescue 2</option>
            <option value="Rescue 4">Rescue 4</option>
            <option value="Rescue 6 / Missort Delivery - 6 Hr">
              Rescue 6 / Missort Delivery - 6 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 4 Hr">
              MFN Pickup Standard Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 5 Hr">
              MFN Pickup Standard Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 6 Hr">
              MFN Pickup Standard Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 8 Hr">
              MFN Pickup Standard Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 9 Hr">
              MFN Pickup Standard Full Van - 9 Hr
            </option>
            <option value="MFN Pickup Luton VAN - 4 Hr">
              MFN Pickup Luton VAN - 4 Hr
            </option>
            <option value="MFN Pickup Luton VAN - 6 Hr">
              MFN Pickup Luton VAN - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 4 Hr">
              MFN Pickup Large Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 5 Hr">
              MFN Pickup Large Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 6 Hr">
              MFN Pickup Large Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 8 H">
              MFN Pickup Large Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 9 Hr">
              MFN Pickup Large Full Van - 9 Hr
            </option>
          </select>
          {/* day 2 end  */}

          {/* day 3 start  */}

          <label for="">Day 3</label>
          <input
            type="date"
            name="daythreedate"
            placeholder="Enter Date Of Joining"
            value={ScehueleRota.daythreedate}
            onChange={handleInputChange}
          />

          <select
            name="servicestypeday3"
            value={ScehueleRota.servicestypeday3}
            onChange={handleInputChange}
          >
            <option value="">Services Type</option>
            <option value="Standard Parcel - 9 Hr">
              Standard Parcel - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr 30 Mins">
              Standard Parcel - 9 Hr 30 Mins
            </option>
            <option value="Standard Parcel Large Van - 9 Hr">
              Standard Parcel Large Van - 9 Hr
            </option>
            <option value="Standard Parcel Large Van - 9 Hr 30 Mins">
              Standard Parcel Large Van - 9 Hr 30 Mins
            </option>
            <option value="Remote Debrief - 9 Hr">Remote Debrief - 9 Hr</option>
            <option value="Nursery Route Level 1 - 9 Hr">
              Nursery Route Level 1 - 9 Hr
            </option>
            <option value="Nursery Route Level 2 - 9 Hr">
              Nursery Route Level 2 - 9 Hr
            </option>
            <option value="Classroom Training">Classroom Training</option>
            <option value="Ride Along">Ride Along</option>
            <option value="Rescue 2">Rescue 2</option>
            <option value="Rescue 4">Rescue 4 </option>
            <option value="Rescue 6 / Missort Delivery - 6 Hr">
              Rescue 6 / Missort Delivery - 6 Hr
            </option>
            <option value="MFN Standard Full Van - 4 Hr">
              MFN Standard Full Van - 4 Hr
            </option>
            <option value="MFN Standard Full Van - 5 Hr">
              MFN Standard Full Van - 5 Hr
            </option>
            <option value="MFN Standard Full Van - 6 Hr">
              MFN Standard Full Van - 6 Hr
            </option>
            <option value="MFN Standard Full Van - 8 Hr">
              MFN Standard Full Van - 8 Hr
            </option>
            <option value="MFN Standard Full Van - 9 Hr">
              MFN Standard Full Van - 9 Hr
            </option>
            <option value="MFN Luton VAN - 4 Hr">MFN Luton VAN - 4 Hr</option>
            <option value="MFN Luton VAN - 6 Hr">MFN Luton VAN - 6 Hr</option>
            <option value="MFN Pickup Large Full Van - 4 Hr">
              MFN Pickup Large Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 5 Hr">
              MFN Pickup Large Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 6 Hr">
              MFN Pickup Large Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 8 Hr">
              MFN Pickup Large Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 9 Hr">
              MFN Pickup Large Full Van - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr">
              Standard Parcel - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr 30 Mins">
              Standard Parcel - 9 Hr 30 Mins
            </option>
            <option value="Standard Parcel Large Van - 9 Hr">
              Standard Parcel Large Van - 9 Hr
            </option>
            <option value="Standard Parcel Large Van - 9 Hr 30 Mins">
              Standard Parcel Large Van - 9 Hr 30 Mins
            </option>
            <option value="Remote Debrief - 9 Hr">Remote Debrief - 9 Hr</option>
            <option value="Nursery Route Level 1 - 9 Hr">
              Nursery Route Level 1 - 9 Hr
            </option>
            <option value="Nursery Route Level 2 - 9 Hr">
              Nursery Route Level 2 - 9 Hr
            </option>
            <option value="Classroom Training">Classroom Training</option>
            <option value="Ride Along">Ride Along</option>
            <option value="Rescue 2">Rescue 2</option>
            <option value="Rescue 4">Rescue 4</option>
            <option value="Rescue 6 / Missort Delivery - 6 Hr">
              Rescue 6 / Missort Delivery - 6 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 4 Hr">
              MFN Pickup Standard Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 5 Hr">
              MFN Pickup Standard Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 6 Hr">
              MFN Pickup Standard Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 8 Hr">
              MFN Pickup Standard Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 9 Hr">
              MFN Pickup Standard Full Van - 9 Hr
            </option>
            <option value="MFN Pickup Luton VAN - 4 Hr">
              MFN Pickup Luton VAN - 4 Hr
            </option>
            <option value="MFN Pickup Luton VAN - 6 Hr">
              MFN Pickup Luton VAN - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 4 Hr">
              MFN Pickup Large Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 5 Hr">
              MFN Pickup Large Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 6 Hr">
              MFN Pickup Large Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 8 H">
              MFN Pickup Large Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 9 Hr">
              MFN Pickup Large Full Van - 9 Hr
            </option>
          </select>
          {/* day 3 end  */}

          {/* day 4 start  */}

          <label for="">Day 4</label>
          <input
            type="date"
            name="dayfourdate"
            placeholder="Enter Date Of Joining"
            value={ScehueleRota.dayfourdate}
            onChange={handleInputChange}
          />

          <select
            name="servicestypeday4"
            value={ScehueleRota.servicestypeday4}
            onChange={handleInputChange}
          >
            <option value="">Services Type</option>
            <option value="Standard Parcel - 9 Hr">
              Standard Parcel - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr 30 Mins">
              Standard Parcel - 9 Hr 30 Mins
            </option>
            <option value="Standard Parcel Large Van - 9 Hr">
              Standard Parcel Large Van - 9 Hr
            </option>
            <option value="Standard Parcel Large Van - 9 Hr 30 Mins">
              Standard Parcel Large Van - 9 Hr 30 Mins
            </option>
            <option value="Remote Debrief - 9 Hr">Remote Debrief - 9 Hr</option>
            <option value="Nursery Route Level 1 - 9 Hr">
              Nursery Route Level 1 - 9 Hr
            </option>
            <option value="Nursery Route Level 2 - 9 Hr">
              Nursery Route Level 2 - 9 Hr
            </option>
            <option value="Classroom Training">Classroom Training</option>
            <option value="Ride Along">Ride Along</option>
            <option value="Rescue 2">Rescue 2</option>
            <option value="Rescue 4">Rescue 4 </option>
            <option value="Rescue 6 / Missort Delivery - 6 Hr">
              Rescue 6 / Missort Delivery - 6 Hr
            </option>
            <option value="MFN Standard Full Van - 4 Hr">
              MFN Standard Full Van - 4 Hr
            </option>
            <option value="MFN Standard Full Van - 5 Hr">
              MFN Standard Full Van - 5 Hr
            </option>
            <option value="MFN Standard Full Van - 6 Hr">
              MFN Standard Full Van - 6 Hr
            </option>
            <option value="MFN Standard Full Van - 8 Hr">
              MFN Standard Full Van - 8 Hr
            </option>
            <option value="MFN Standard Full Van - 9 Hr">
              MFN Standard Full Van - 9 Hr
            </option>
            <option value="MFN Luton VAN - 4 Hr">MFN Luton VAN - 4 Hr</option>
            <option value="MFN Luton VAN - 6 Hr">MFN Luton VAN - 6 Hr</option>
            <option value="MFN Pickup Large Full Van - 4 Hr">
              MFN Pickup Large Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 5 Hr">
              MFN Pickup Large Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 6 Hr">
              MFN Pickup Large Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 8 Hr">
              MFN Pickup Large Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 9 Hr">
              MFN Pickup Large Full Van - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr">
              Standard Parcel - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr 30 Mins">
              Standard Parcel - 9 Hr 30 Mins
            </option>
            <option value="Standard Parcel Large Van - 9 Hr">
              Standard Parcel Large Van - 9 Hr
            </option>
            <option value="Standard Parcel Large Van - 9 Hr 30 Mins">
              Standard Parcel Large Van - 9 Hr 30 Mins
            </option>
            <option value="Remote Debrief - 9 Hr">Remote Debrief - 9 Hr</option>
            <option value="Nursery Route Level 1 - 9 Hr">
              Nursery Route Level 1 - 9 Hr
            </option>
            <option value="Nursery Route Level 2 - 9 Hr">
              Nursery Route Level 2 - 9 Hr
            </option>
            <option value="Classroom Training">Classroom Training</option>
            <option value="Ride Along">Ride Along</option>
            <option value="Rescue 2">Rescue 2</option>
            <option value="Rescue 4">Rescue 4</option>
            <option value="Rescue 6 / Missort Delivery - 6 Hr">
              Rescue 6 / Missort Delivery - 6 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 4 Hr">
              MFN Pickup Standard Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 5 Hr">
              MFN Pickup Standard Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 6 Hr">
              MFN Pickup Standard Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 8 Hr">
              MFN Pickup Standard Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 9 Hr">
              MFN Pickup Standard Full Van - 9 Hr
            </option>
            <option value="MFN Pickup Luton VAN - 4 Hr">
              MFN Pickup Luton VAN - 4 Hr
            </option>
            <option value="MFN Pickup Luton VAN - 6 Hr">
              MFN Pickup Luton VAN - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 4 Hr">
              MFN Pickup Large Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 5 Hr">
              MFN Pickup Large Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 6 Hr">
              MFN Pickup Large Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 8 H">
              MFN Pickup Large Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 9 Hr">
              MFN Pickup Large Full Van - 9 Hr
            </option>
          </select>
          {/* day 4 end  */}

          {/* day 5 start  */}

          <label for="">Day 5</label>
          <input
            type="date"
            name="dayfivedate"
            placeholder="Enter Date Of Joining"
            value={ScehueleRota.dayfivedate}
            onChange={handleInputChange}
          />

          <select
            name="servicestypeday5"
            value={ScehueleRota.servicestypeday5}
            onChange={handleInputChange}
          >
            <option value="">Services Type</option>
            <option value="Standard Parcel - 9 Hr">
              Standard Parcel - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr 30 Mins">
              Standard Parcel - 9 Hr 30 Mins
            </option>
            <option value="Standard Parcel Large Van - 9 Hr">
              Standard Parcel Large Van - 9 Hr
            </option>
            <option value="Standard Parcel Large Van - 9 Hr 30 Mins">
              Standard Parcel Large Van - 9 Hr 30 Mins
            </option>
            <option value="Remote Debrief - 9 Hr">Remote Debrief - 9 Hr</option>
            <option value="Nursery Route Level 1 - 9 Hr">
              Nursery Route Level 1 - 9 Hr
            </option>
            <option value="Nursery Route Level 2 - 9 Hr">
              Nursery Route Level 2 - 9 Hr
            </option>
            <option value="Classroom Training">Classroom Training</option>
            <option value="Ride Along">Ride Along</option>
            <option value="Rescue 2">Rescue 2</option>
            <option value="Rescue 4">Rescue 4 </option>
            <option value="Rescue 6 / Missort Delivery - 6 Hr">
              Rescue 6 / Missort Delivery - 6 Hr
            </option>
            <option value="MFN Standard Full Van - 4 Hr">
              MFN Standard Full Van - 4 Hr
            </option>
            <option value="MFN Standard Full Van - 5 Hr">
              MFN Standard Full Van - 5 Hr
            </option>
            <option value="MFN Standard Full Van - 6 Hr">
              MFN Standard Full Van - 6 Hr
            </option>
            <option value="MFN Standard Full Van - 8 Hr">
              MFN Standard Full Van - 8 Hr
            </option>
            <option value="MFN Standard Full Van - 9 Hr">
              MFN Standard Full Van - 9 Hr
            </option>
            <option value="MFN Luton VAN - 4 Hr">MFN Luton VAN - 4 Hr</option>
            <option value="MFN Luton VAN - 6 Hr">MFN Luton VAN - 6 Hr</option>
            <option value="MFN Pickup Large Full Van - 4 Hr">
              MFN Pickup Large Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 5 Hr">
              MFN Pickup Large Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 6 Hr">
              MFN Pickup Large Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 8 Hr">
              MFN Pickup Large Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 9 Hr">
              MFN Pickup Large Full Van - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr">
              Standard Parcel - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr 30 Mins">
              Standard Parcel - 9 Hr 30 Mins
            </option>
            <option value="Standard Parcel Large Van - 9 Hr">
              Standard Parcel Large Van - 9 Hr
            </option>
            <option value="Standard Parcel Large Van - 9 Hr 30 Mins">
              Standard Parcel Large Van - 9 Hr 30 Mins
            </option>
            <option value="Remote Debrief - 9 Hr">Remote Debrief - 9 Hr</option>
            <option value="Nursery Route Level 1 - 9 Hr">
              Nursery Route Level 1 - 9 Hr
            </option>
            <option value="Nursery Route Level 2 - 9 Hr">
              Nursery Route Level 2 - 9 Hr
            </option>
            <option value="Classroom Training">Classroom Training</option>
            <option value="Ride Along">Ride Along</option>
            <option value="Rescue 2">Rescue 2</option>
            <option value="Rescue 4">Rescue 4</option>
            <option value="Rescue 6 / Missort Delivery - 6 Hr">
              Rescue 6 / Missort Delivery - 6 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 4 Hr">
              MFN Pickup Standard Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 5 Hr">
              MFN Pickup Standard Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 6 Hr">
              MFN Pickup Standard Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 8 Hr">
              MFN Pickup Standard Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 9 Hr">
              MFN Pickup Standard Full Van - 9 Hr
            </option>
            <option value="MFN Pickup Luton VAN - 4 Hr">
              MFN Pickup Luton VAN - 4 Hr
            </option>
            <option value="MFN Pickup Luton VAN - 6 Hr">
              MFN Pickup Luton VAN - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 4 Hr">
              MFN Pickup Large Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 5 Hr">
              MFN Pickup Large Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 6 Hr">
              MFN Pickup Large Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 8 H">
              MFN Pickup Large Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 9 Hr">
              MFN Pickup Large Full Van - 9 Hr
            </option>
          </select>
          {/* day 5 end  */}

          {/* day 5 start  */}

          <label for="">Day 6</label>
          <input
            type="date"
            name="daysixdate"
            placeholder="Enter Date Of Joining"
            value={ScehueleRota.daysixdate}
            onChange={handleInputChange}
          />

          <select
            name="servicestypeday6"
            value={ScehueleRota.servicestypeday6}
            onChange={handleInputChange}
          >
            <option value="">Services Type</option>
            <option value="Standard Parcel - 9 Hr">
              Standard Parcel - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr 30 Mins">
              Standard Parcel - 9 Hr 30 Mins
            </option>
            <option value="Standard Parcel Large Van - 9 Hr">
              Standard Parcel Large Van - 9 Hr
            </option>
            <option value="Standard Parcel Large Van - 9 Hr 30 Mins">
              Standard Parcel Large Van - 9 Hr 30 Mins
            </option>
            <option value="Remote Debrief - 9 Hr">Remote Debrief - 9 Hr</option>
            <option value="Nursery Route Level 1 - 9 Hr">
              Nursery Route Level 1 - 9 Hr
            </option>
            <option value="Nursery Route Level 2 - 9 Hr">
              Nursery Route Level 2 - 9 Hr
            </option>
            <option value="Classroom Training">Classroom Training</option>
            <option value="Ride Along">Ride Along</option>
            <option value="Rescue 2">Rescue 2</option>
            <option value="Rescue 4">Rescue 4 </option>
            <option value="Rescue 6 / Missort Delivery - 6 Hr">
              Rescue 6 / Missort Delivery - 6 Hr
            </option>
            <option value="MFN Standard Full Van - 4 Hr">
              MFN Standard Full Van - 4 Hr
            </option>
            <option value="MFN Standard Full Van - 5 Hr">
              MFN Standard Full Van - 5 Hr
            </option>
            <option value="MFN Standard Full Van - 6 Hr">
              MFN Standard Full Van - 6 Hr
            </option>
            <option value="MFN Standard Full Van - 8 Hr">
              MFN Standard Full Van - 8 Hr
            </option>
            <option value="MFN Standard Full Van - 9 Hr">
              MFN Standard Full Van - 9 Hr
            </option>
            <option value="MFN Luton VAN - 4 Hr">MFN Luton VAN - 4 Hr</option>
            <option value="MFN Luton VAN - 6 Hr">MFN Luton VAN - 6 Hr</option>
            <option value="MFN Pickup Large Full Van - 4 Hr">
              MFN Pickup Large Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 5 Hr">
              MFN Pickup Large Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 6 Hr">
              MFN Pickup Large Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 8 Hr">
              MFN Pickup Large Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 9 Hr">
              MFN Pickup Large Full Van - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr">
              Standard Parcel - 9 Hr
            </option>
            <option value="Standard Parcel - 9 Hr 30 Mins">
              Standard Parcel - 9 Hr 30 Mins
            </option>
            <option value="Standard Parcel Large Van - 9 Hr">
              Standard Parcel Large Van - 9 Hr
            </option>
            <option value="Standard Parcel Large Van - 9 Hr 30 Mins">
              Standard Parcel Large Van - 9 Hr 30 Mins
            </option>
            <option value="Remote Debrief - 9 Hr">Remote Debrief - 9 Hr</option>
            <option value="Nursery Route Level 1 - 9 Hr">
              Nursery Route Level 1 - 9 Hr
            </option>
            <option value="Nursery Route Level 2 - 9 Hr">
              Nursery Route Level 2 - 9 Hr
            </option>
            <option value="Classroom Training">Classroom Training</option>
            <option value="Ride Along">Ride Along</option>
            <option value="Rescue 2">Rescue 2</option>
            <option value="Rescue 4">Rescue 4</option>
            <option value="Rescue 6 / Missort Delivery - 6 Hr">
              Rescue 6 / Missort Delivery - 6 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 4 Hr">
              MFN Pickup Standard Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 5 Hr">
              MFN Pickup Standard Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 6 Hr">
              MFN Pickup Standard Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 8 Hr">
              MFN Pickup Standard Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Standard Full Van - 9 Hr">
              MFN Pickup Standard Full Van - 9 Hr
            </option>
            <option value="MFN Pickup Luton VAN - 4 Hr">
              MFN Pickup Luton VAN - 4 Hr
            </option>
            <option value="MFN Pickup Luton VAN - 6 Hr">
              MFN Pickup Luton VAN - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 4 Hr">
              MFN Pickup Large Full Van - 4 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 5 Hr">
              MFN Pickup Large Full Van - 5 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 6 Hr">
              MFN Pickup Large Full Van - 6 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 8 H">
              MFN Pickup Large Full Van - 8 Hr
            </option>
            <option value="MFN Pickup Large Full Van - 9 Hr">
              MFN Pickup Large Full Van - 9 Hr
            </option>
          </select>
          {/* day 5 end  */}
          <div id="profile-Btn">
            <button id="Submit" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
