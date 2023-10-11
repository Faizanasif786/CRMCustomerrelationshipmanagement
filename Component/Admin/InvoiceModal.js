import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import './Invioce.css'

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

function InvoiceModal({ data, onClose, selectedWeek }) {
  const [invoiceNumber, setInvoiceNumber] = useState(""); // State to store the invoice number
  const [formDataList, setFormDataList] = useState([]);
  
  useEffect(() => {
    // Set up a listener to fetch the data from the "ContactForm" reference
    const dataRef = ref(database, 'ContactForm');
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

  const generatePdf = async () => {
    const content = document.getElementById("pdf-content");
    if (!content) {
      return;
    }

    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("invoice.pdf");
  };

  function getDayOfWeek(date) {
    if (!date) return ''; // Handle null or undefined date
    const options = { weekday: 'long' }; // 'long' will return the full day name
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', options);
    return dayOfWeek;
  }

  const generateInvoiceNumber = () => {
    // You can generate the invoice number as per your requirements.
    // For simplicity, we will use a random number in this example.
    const randomInvoiceNumber = Math.floor(Math.random() * 100000);
    
    setInvoiceNumber(randomInvoiceNumber.toString()); // Set the generated invoice number to state
  };

  const getWeekDateRange = (selectedWeek) => {
  
    // Calculate the start and end dates for the selected week
    const startDate = new Date(new Date().getFullYear(), 0, 1);
    startDate.setDate(startDate.getDate() + (selectedWeek - 1) * 7 - startDate.getDay());

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);

    return `${startDate.toLocaleDateString('en-US')} to ${endDate.toLocaleDateString('en-US')}`;
  };
 
  console.log(data)
  let totalAmountSum = 0;
  let totalDeductionSum = 0;
 let totalvatsumdone = 0;
 let totalvatsum = 0;
//  let dueAmount = 0;

 const dueAmount = totalvatsumdone - totalDeductionSum;
                      
  return (
  
    <div className="modal">
      <span className="close" onClick={onClose}>
        &times;
      </span>

      <br />

      <div className="modal-content">
        {data.map((invoice, index) => (
          <div id="pdf-content" key={index} className="modal-group">
            <div className="top">
              <h1  >SELF - BIL+B2:K55LED INVOICE</h1>
            </div>
            <div>
              <div className="aft-heading">
                <div className="top-left">
                  {selectedWeek ? <p>For Deliveries Made During the week no {selectedWeek}</p> : null}
                  <p>{selectedWeek ? getWeekDateRange(selectedWeek) : null}</p>
                </div>
                <div className='invoice-no'>
                  <p>Invoice Number: {invoiceNumber || generateInvoiceNumber()}</p>
                  Site: {invoice.items[0].site}
                </div>
              </div>
           
              <div className='bill-from'>
                <h2>Bill From</h2>
                <h3>Transport ID: {invoice.transportId}</h3>
                
                <p>
                  Name: {invoice.items[0].drivefirstname} {invoice.items[0].drivelastname}
                  <br />
                </p>
              </div>
            </div>
            <div className="Bill-to-Ship-to">
              <div className="Bill-to">
                <h2>Bill To</h2>
                <p>Raina Ltd.</p>
                <p>Digital World Centre </p>
                <p>1 Lowry Plaza</p>
                <p>The Quays</p>
                <p>Salford</p>
                <p>Manchester</p>
                <p>M50 3UB</p>
                <p>VAT No. 266927460</p>
              </div>
              <div className="Bill-to">
                <h2>Ship To</h2>
                <p>DXM5</p>
                <p>Unit F2 , G & H </p>
                <p>Lomax Wy</p>
                <p>Bolton</p>
                <p>BL5 1FQ</p>
              </div>
            </div>
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Days</th>
                  <th>Service Type</th>
                  <th>Unit Rate</th>
                  <th>Byod</th>
                  <th>Miles</th>
                  <th>Mileage</th>
                  <th>Additional Services</th>
                  <th>Additional Rate</th>
                  <th>Peak Incentive</th>
                  <th>Total Amount</th> {/* Add a new header for Total Amount */}
                </tr>
              </thead>
              <tbody>
                
                {invoice.items.map((item, itemIndex) => {
                  
                  // Remove currency symbol and non-numeric characters from unitrate and brate
                  const unitRate = item.unitrate ? parseFloat(item.unitrate.replace(/[^0-9.]/g, '')) || 0 : 0;
                  const additionalRate = item.brate ? parseFloat(item.brate.replace(/[^0-9.]/g, '')) || 0 : 0;
                  const milage = item.milage ? parseFloat(item.milage.replace(/[^0-9.]/g, '')) || 0 : 0;
                  let totalAmount = unitRate + additionalRate + milage;
                  totalAmountSum += totalAmount;
                  const rate = item.rate ? parseFloat(item.rate.replace(/[^0-9.]/g, '')) || 0 : 0;
                 const totalDeduction = rate ;
                  totalDeductionSum += totalDeduction;
                 
               // Sum the vatNo values
                  // Update dueAmount


                  return (
                    <tr key={itemIndex}>
                      <td>{item.date}</td>
                      <td>{getDayOfWeek(item.date)}</td>
                      <td>{item.services}</td>
                      <td>{item.unitrate}</td>
                      <td>{item.brate}</td>
                      <td>{item.miles}</td>
                      <td>{item.milage}</td>
                      <td>{item.addtionalServices}</td>
                      <td>{item.urate}</td>
                      <td>{item.peakincentive}</td>
                      <td>£ {totalAmount.toFixed(2)}</td> {/* Display the calculated Total Amount with 2 decimal places */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
<div className='total-sub'>
  
<p>Total Amount : <span>£ {totalAmountSum.toFixed(2)}</span></p>
<p>Sub Total : <span>£ {totalAmountSum.toFixed(2)}</span></p>


  </div>
            <table className="deduction-table">
              <thead>
                <tr>
                  <th>Deduction</th>
                  <th>Amount</th>
                  {/* <th>Partially</th> */}
                  <th>VAT 20%</th>
                  
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, itemIndex) => (
                  
                   <tr key={itemIndex}>
                    
                    { <td>{item.driverdeductionservices}</td>}
                    { <td>{item.rate}</td>}
                    {/* { <td>20%</td>} */}
              
                    
                    {/* Check if invoice.transportId matches formData.transportId */}
                   
                    {formDataList.map((formData, index) => {
                      
                      if (invoice.transportId === formData.transportId) {
                      
                        const vatNo = formData.vatNo ? parseFloat(formData.vatNo.replace(/[^0-9.]/g, '')) || 0 : 0;
                        let totalvatsum = vatNo;
                        totalvatsumdone += totalvatsum;
                          return (
                          
                          <React.Fragment key={index}>
                             <td>{formData.vatNo}</td>
                          
                            {/* Add other table cells here if needed */}
                          </React.Fragment>
                          
                        );
                        
                      } else {
                        return null; // Don't render anything if transportId doesn't match
                      }
                      
                    })}
                  </tr>
                  
                ))}


      {/* <tr >    

      </tr> */}
<div className='total-deduction-final'>

<p>Amount :  <span>£ {totalDeductionSum.toFixed(2)}</span></p>
<p>Total Vat No : {
    formDataList.map((formData, index) => {
      if (invoice.transportId === formData.transportId) {
        if ( !formData.vatNo) {
          totalvatsum = 0;
          return (
            <span key={index}>{totalvatsum}</span>
          ) 
        } else {
          totalvatsum = (totalDeductionSum.toFixed(2) * 20) / 100;
          return (
            <span key={index}>£ {totalvatsum}</span>
          )
        }
      }
    })
  }</p>

<p>TotalDeduction:  <span>£ {(parseFloat(totalDeductionSum) + parseFloat(totalvatsum)).toFixed(2)}</span></p>
<p>Amount Due:  <span>£ {(parseFloat(totalAmountSum).toFixed(2) - (parseFloat(totalDeductionSum) + parseFloat(totalvatsum))).toFixed(2)}</span></p>
</div>
{formDataList.map((formData, index) => {
      if (invoice.transportId === formData.transportId) {

        if(formData.vatNo) {

        }

        return (
          <div key={index}>
            <div className='account-detail'>
            <div>Bank Name: {formData.bankName}</div>
            <div>Account No: {formData.bankAccountNumber}</div>
            <div>Sort Number: {formData.sortCode}</div>
            </div>
            {/* Add other table cells here if needed */}
          </div>
        );
      } else {
        return null; // Don't render anything if transportId doesn't match
      }
    })}


              </tbody>
            </table>
      
            <button id="Generate-Invioce" onClick={generatePdf}>Generate Invoice</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InvoiceModal;
