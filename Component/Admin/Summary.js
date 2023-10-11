import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; // Import the compat version
import 'firebase/compat/database'; // Import the compat version for database
import Navbar from '../Navbar';

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function Summary() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvDataList, setCsvDataList] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    // Fetch CSV data from Firebase when component mounts
    const fetchData = async () => {
      const database = firebase.database();
      const snapshot = await database.ref('/csvFiles').once('value');
      const dataFromFirebase = snapshot.val();
      if (dataFromFirebase) {
        setCsvDataList(dataFromFirebase);
        setShowTable(true);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const contents = event.target.result;
        const lines = contents.split('\n');
        const data = lines.map(line => line.split(','));

        // Upload CSV data to Firebase
        const database = firebase.database();
        const newCsvRef = database.ref('/csvFiles').push(); // Get a new unique reference
        await newCsvRef.set(data);

        // Fetch all CSV files' data and update the state
        const snapshot = await database.ref('/csvFiles').once('value');
        const allCsvData = snapshot.val();
        if (allCsvData) {
          setCsvDataList(allCsvData);
          setShowTable(true);
        }

        alert('File has been uploaded and data is stored in Firebase');
      };
      reader.readAsText(selectedFile);
    } else {
      alert('Please select a file first');
    }
  };

  return (
    <>
      <Navbar />
      <h1 className='summary-heading'> Summary</h1>
      <div className='upload-container'>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleUpload} >Upload</button>
      </div>
      {showTable && (
        <div className='summary-container'>
          {Object.keys(csvDataList).map((key) => (
            <div key={key}>
              <h3>Uploaded Files</h3>
              {/* <h3>CSV File: {key}</h3> */}
              <table>
                {csvDataList[key].map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </table>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
