import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { getDatabase, onValue, ref } from "@firebase/database";
import { initializeApp } from "firebase/app";
import InvoiceModal from "./InvoiceModal";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function Invoice() {
  const [approvedList, setApprovedList] = useState([]);
  const [firstNameFilter, setFirstNameFilter] = useState("");
  const [weeksFilter, setWeeksFilter] = useState(0);
  const [transportIdFilter, setTransportIdFilter] = useState(""); // New Transport ID filter
  const [generatedInvoices, setGeneratedInvoices] = useState([]);
  const [randomInvoiceNumber, setRandomInvoiceNumber] = useState(null);
  const [selectedWeekOfYear, setSelectedWeekOfYear] = useState(0);

  function generateRandomInvoiceNumber() {
    // Generate a random 6-digit invoice number
    return Math.floor(100000 + Math.random() * 900000);
  }

  useEffect(() => {
    const approvalsRef = ref(database, "Approvals");

    const unsubscribeApprovals = onValue(approvalsRef, (snapshot) => {
      const approvalsArray = [];
      snapshot.forEach((childSnapshot) => {
        const approvals = childSnapshot.val();
        approvalsArray.push(approvals);
      });
      setApprovedList(approvalsArray);
    });

    return () => {
      unsubscribeApprovals();
    };
  }, []);

  const generateFilteredInvoices = () => {
    if (approvedList.length === 0) {
      console.log("No data to generate invoices.");
      return;
    }
    console.log("Generating invoices for filtered data:");
  
    const groupedData = {};
  
    approvedList.forEach((data) => {
      const today = new Date();
      const selectedStartDate = new Date(today);
      selectedStartDate.setDate(
        selectedStartDate.getDate() - weeksFilter * 7
      );
  
      // Calculate the week of the year for the data.date
      const weekOfYear = getWeekOfYear(data.date);
  
      if (
        (!firstNameFilter ||
          data.drivefirstname
            .toLowerCase()
            .includes(firstNameFilter.toLowerCase())) &&
        (!weeksFilter ||
          (weeksFilter > 0 &&
            new Date(data.date) >= selectedStartDate &&
            new Date(data.date) <= today)) &&
        (!transportIdFilter ||
          data.transportId
            .toLowerCase()
            .includes(transportIdFilter.toLowerCase())) &&
        (!selectedWeekOfYear || weekOfYear === selectedWeekOfYear)
      ) {
        if (!groupedData[data.transportId]) {
          groupedData[data.transportId] = [];
        }
        groupedData[data.transportId].push(data);
      }
    });
  
    const generatedInvoicesArray = [];
    Object.keys(groupedData).forEach((transportId) => {
      const groupedItems = groupedData[transportId];
      console.log(`Generating invoice for Transport ID: ${transportId}`);
      console.log(groupedItems);
  
      const randomInvoiceNo = generateRandomInvoiceNumber(); // Generate a new invoice number for each group
      const invoice = {
        transportId,
        items: groupedItems,
        invoiceNumber: randomInvoiceNo,
      };
      generatedInvoicesArray.push(invoice);
    });
  
    setGeneratedInvoices(generatedInvoicesArray);
  };
  
  function getDayOfWeek(date) {
    if (!date) return ""; // Handle null or undefined date
    const options = { weekday: "long" }; // 'long' will return the full day name
    const dayOfWeek = new Date(date).toLocaleDateString("en-US", options);
    return dayOfWeek;
  }

  function getWeekOfYear(date) {
    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
    currentDate.setDate(currentDate.getDate() + 4 - (currentDate.getDay() || 7));
    const yearStart = new Date(currentDate.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((currentDate - yearStart) / 86400000 + 1) / 7);
    return weekNumber;
  }
  
  // function formatDateToDDMMYYYY(dateString) {
  //   const date = new Date(dateString);
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear();
  //   return `${month}-${day}-${year}`;
  // }

  return (
    <>
      <Navbar />
      <div>
        <h1 className="profileData">Invioce </h1>
        <div>
          <label htmlFor="firstNameFilter">Filter by First Name: </label>
          <input
            type="text"
            id="firstNameFilter"
            value={firstNameFilter}
            onChange={(e) => setFirstNameFilter(e.target.value)}
          />
          <label htmlFor="transportIdFilter">Filter by Transport ID: </label>
          <input
            type="text"
            id="transportIdFilter"
            value={transportIdFilter}
            onChange={(e) => setTransportIdFilter(e.target.value)}
          />
<label htmlFor="weekOfYearFilter">Filter by Week of Year:</label>
<select
  id="weekOfYearFilter"
  value={selectedWeekOfYear}
  onChange={(e) => setSelectedWeekOfYear(parseInt(e.target.value))}
>
  <option value={0}>All Weeks</option>
  {Array.from({ length: 52 }, (_, i) => i + 1).map((weekNumber) => (
    <option key={weekNumber} value={weekNumber}>
      Week {weekNumber}
    </option>
  ))}
</select>

          <label htmlFor="weeksFilter">Filter by Weeks: </label>
          <select
            id="weeksFilter"
            value={weeksFilter}
            onChange={(e) => setWeeksFilter(parseInt(e.target.value))}
          >
            <option value={0}>All Weeks</option>
            <option value={1}>Last 1 week</option>
            <option value={2}>Last 2 weeks</option>
            <option value={3}>Last 3 weeks</option>
            <option value={4}>Last 4 weeks</option>
            <option value={5}>Last 5 weeks</option>
            <option value={6}>Last 6 weeks</option>
            <option value={7}>Last 7 weeks</option>
            {/* Add more options for weeks */}
          </select>
          <button onClick={() => generateFilteredInvoices()}>
            Generate All Invoice
          </button>
        </div>

        {approvedList.length === 0 ? (
          <p>Available Data</p>
        ) : (
          <table>
            <div id="paymentsystemtopheader">
              <div>S:No</div>
              <div>First Name</div>
              <div>Last Name</div>
              <div>Transport Id </div>
              <div>Vat No</div>
              <div>Date</div>
              <div>Day</div>
              {/* <div>No Of week</div> */}
              <div>Service Type</div>
              <div>Unit Rate </div>
              <div>Additional Service</div>
              <div>Unit Rate</div>
              <div>Byod</div>
              <div>Miles</div>
              <div>Milages</div>
              {/* <div>PeakInsentive</div> */}
              <div>D Rate</div>
              <div>D Services</div>

              <div>Status</div>
              <div>Invoice</div>
            </div>
            <tbody>
            {approvedList
  .filter((data) => {
    const today = new Date();
    const selectedStartDate = new Date(today);
    selectedStartDate.setDate(
      selectedStartDate.getDate() - weeksFilter * 7
    );
    
    // Calculate the week of the year for the data.date
    const weekOfYear = getWeekOfYear(data.date);
    
    if (
      (!firstNameFilter ||
        data.drivefirstname
          .toLowerCase()
          .includes(firstNameFilter.toLowerCase())) &&
      (!weeksFilter ||
        (weeksFilter > 0 &&
          new Date(data.date) >= selectedStartDate &&
          new Date(data.date) <= today)) &&
      (!transportIdFilter ||
        data.transportId
          .toLowerCase()
          .includes(transportIdFilter.toLowerCase())) &&
      (!selectedWeekOfYear || weekOfYear === selectedWeekOfYear)
    ) {
      return true;
    }
    return false;
  })
                .map((data, index) => {
                   // Your data object with the date
 

                  return (
                    <tr key={index}>
                      <div id="paymentsystem">
                        <div>{index + 1}</div>
                        <div>{data.drivefirstname}</div>
                        <div>{data.drivelastname}</div>
                        <div>{data.transportId}</div>
                        <div>{data.vatnumber}</div>
                        {/* <div>{data.site}</div> */}
                        <div>{data.date}</div>

                        <div>{getDayOfWeek(data?.date)}</div>

                        <div>{data.services}</div>
                        <div>{data.unitrate}</div>

                        <div>{data.addtionalServices}</div>
                        <div>{data.urate}</div>
                        <div>{data.brate}</div>
                        <div>{data.rate}</div>
                        <div>{data.driverdeductionservices}</div>

                        <div>{data.miles}</div>
                        <div>{data.milage}</div>
                        <div>{data.status}</div>
                        <button>Generate Invoice</button>
                      </div>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
      {generatedInvoices.length > 0 && (
        <InvoiceModal
          data={generatedInvoices}
          onClose={() => setGeneratedInvoices([])}
          selectedWeek={selectedWeekOfYear}
        />
      )}
    </>
  );
}
