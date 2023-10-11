import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app"; // Import the compat version
import "firebase/compat/database"; // Import the compat version for the database
import Navbar from "../Navbar";
import { set } from "date-fns";
import { getDatabase, onValue, ref } from "@firebase/database";
import { initializeApp } from "firebase/app";

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function SubSummary() {
  const [csvDataList, setCsvDataList] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [paymentDataList, setPaymentDataList] = useState([]);

  useEffect(() => {
    // Fetch CSV data from Firebase when the component mounts
    const fetchData = async () => {
      const database = firebase.database();
      const snapshot = await database.ref("/csvFiles").once("value");
      const dataFromFirebase = snapshot.val();

      if (dataFromFirebase) {
        // Create an array to store all rows
        const allRows = [];

        // Fetch the approved data for comparison
        const approvedSnapshot = await database.ref("Approvals").once("value");
        const approvedData = approvedSnapshot.val() || [];
        // const paymentSnapshot = await database.ref('Paymentsystem').once('value');
        // const paymentData = paymentSnapshot.val() || [];
        // setPaymentData(paymentData);
        console.log();
        // Loop through each file and its data
        Object.keys(dataFromFirebase).forEach((key) => {
          const fileData = dataFromFirebase[key];

          // Check if fileData is an array; if not, convert it to an array
          const rowsArray = Array.isArray(fileData) ? fileData : [fileData];

          // Map through rowsArray and store each row with 'Yes' or 'No' based on DeliveryAssociate matching
          const selectedColumns = rowsArray.map((row) => {
            const match =
              Array.isArray(approvedData) &&
              approvedData.some(
                (approvedRow) =>
                  approvedRow.date.toLowerCase() === row[3].toLowerCase()
              );
            return {
              Date: row[0],
              DeliveryAssociate: row[3], // Assuming Delivery Associate is the fourth column (adjust accordingly)
              ServiceType: row[5], // Assuming Service Type is the sixth column (adjust accordingly)
              ApprovalStatus: match ? "Yes" : "No",
            };
          });

          // Store the selected columns for this file in the allRows array
          allRows.push(selectedColumns);
        });

        // Update the state with all rows
        setCsvDataList(allRows);
        setShowTable(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const approvalsRef = ref(database, "Paymentsystem");

    const unsubscribeApprovals = onValue(approvalsRef, (snapshot) => {
      const approvalsArray = [];
      snapshot.forEach((childSnapshot) => {
        const approvals = childSnapshot.val();
        approvalsArray.push(approvals);
      });
      setPaymentDataList(approvalsArray);
    });

    return () => {
      unsubscribeApprovals();
    };
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="summary-heading">Sub Summary</h1>
      {showTable && (
        <div className="summary-container">
          <table id="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Delivery Associate</th>
                <th>Service Type</th>
                <th>Approval Status</th>
              </tr>
            </thead>
            <tbody>
              {csvDataList.map((fileData, fileIndex) =>
                // Map through each file's data
                fileData.slice(1, -1).map((row, rowIndex) => {
                  paymentDataList.map((payment) => {
                    if (
                      row.Date === payment.paymentdate &&
                      row.DeliveryAssociate ===
                        `${payment.drivefirstname} ${payment.drivelastname}` &&
                      row.ServiceType === payment.servicestypeday1
                    ) {
                      row.ApprovalStatus = "Yes";
                    }
                  });

                  return (
                    <tr key={`${fileIndex}-${rowIndex}`}>
                      <td>{row.Date}</td>
                      <td>{row.DeliveryAssociate}</td>
                      <td>{row.ServiceType}</td>
                      <td>{row.ApprovalStatus}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
