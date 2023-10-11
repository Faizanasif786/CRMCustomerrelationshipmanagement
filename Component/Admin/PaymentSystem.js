import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';


import { getDatabase, ref, push ,onValue, remove } from 'firebase/database';
import Navbar from '../Navbar';
import { set } from 'date-fns';
import { da } from 'date-fns/locale';

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function getWeekNumber(date) {
    const target = new Date(date);
    const firstDayOfYear = new Date(target.getFullYear(), 0, 1);
    const days = Math.floor((target - firstDayOfYear) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + firstDayOfYear.getDay() + 1) / 7);
    return weekNumber;
  }

export default function RealTimeData() {
  const [ScehueleRotaList, setScehueleRotaList] = useState([]);
  const [PaymentsystemList, setPaymentsystemList] = useState([]);

  const sendApprovalToFirebase = (data) => {
    const newApprovalRef = ref(database, 'Approvals');
    push(newApprovalRef, data);
  };

  const handleApprove = (item, matchingPaymentsystem) => {
    const data = {
      drivefirstname: item.drivefirstname,
      drivelastname: item.drivelastname,
      transportId: item.transportId,
      site: item.site,
      date: item.date,
     
      rate:item.rate,
      driverdeductionservices:item.driverdeductionservices,
      urate:item.urate,
      brate:item.brate,
      unitrate:item.unitrate,
      vatnumber:item.vatnumber,
      services: item.services,
      addtionalServices: matchingPaymentsystem ? matchingPaymentsystem.servicestypeday1 : 0,
      driverdeductionservices:matchingPaymentsystem?matchingPaymentsystem.driverdeductionservices :0,
      urate:matchingPaymentsystem?matchingPaymentsystem.urate:0,
      brate:matchingPaymentsystem?matchingPaymentsystem.brate:0,
      unitrate:matchingPaymentsystem?matchingPaymentsystem.unitrate:0,
      vatnumber:matchingPaymentsystem?matchingPaymentsystem.vatnumber:0,
      rate:matchingPaymentsystem?matchingPaymentsystem.rate:0,
      miles: matchingPaymentsystem ? matchingPaymentsystem.miles : 0,
      milage: matchingPaymentsystem ? matchingPaymentsystem.milage : 0,
      peakincentive: matchingPaymentsystem ? matchingPaymentsystem.peakincentive : 0,
   
      status: 'Approved',
 
    }
    alert('approved')
    sendApprovalToFirebase(data)
  };

  const sendNotApprovalToFirebase = (matchingPaymentsystem) => {
    console.log(matchingPaymentsystem)
    if (matchingPaymentsystem) {
      const paymentRef = ref(database, `Paymentsystem/${matchingPaymentsystem.key}`);
      
      // Use the remove function to delete the entry from the database
      remove(paymentRef)
        .then(() => {
          const newBackupRef = ref(database, 'Backup');
          push(newBackupRef, matchingPaymentsystem);
        })
        .catch((error) => {
          console.error('Error removing payment system entry:', error);
        });
    }
  };

  const handleNotApproved = (matchingPaymentsystem) => {
    if (matchingPaymentsystem) {
      console.log(matchingPaymentsystem)
      const updatedPaymentsystemList = PaymentsystemList.filter(
        payment => payment.paymentdate !== matchingPaymentsystem.paymentdate ||
                   payment.transportId !== matchingPaymentsystem.transportId
      );
      console.log(updatedPaymentsystemList)
      setPaymentsystemList(updatedPaymentsystemList);
      sendNotApprovalToFirebase(matchingPaymentsystem);
    }
  };

  useEffect(() => {
    const scehueleRotaRef = ref(database, 'ScehueleRota');
    const paymentsystemRef = ref(database, 'Paymentsystem');

    const unsubscribeScehueleRota = onValue(scehueleRotaRef, (snapshot) => {
      const ScehueleRotaArray = [];
      snapshot.forEach((childSnapshot) => {
        const ScehueleRota = childSnapshot.val();
        ScehueleRotaArray.push(ScehueleRota);
      });
      setScehueleRotaList(ScehueleRotaArray);
    });

    const unsubscribePaymentsystem = onValue(paymentsystemRef, (snapshot) => {
      const PaymentsystemArray = [];
      snapshot.forEach((childSnapshot) => {
        const Paymentsystem = {
          ...childSnapshot.val(),
          key: childSnapshot.key // Include the unique key in the payment data
        };
        PaymentsystemArray.push(Paymentsystem);
      });
      setPaymentsystemList(PaymentsystemArray);
    });





    return () => {
      unsubscribeScehueleRota();
      unsubscribePaymentsystem();
    };
  }, []);

 
  console.log(ScehueleRotaList, PaymentsystemList);

  
  return (
    <>
      <Navbar />
      <div>
        <h1 className='profileData'>Payment System</h1>
        {ScehueleRotaList.length === 0 ? (
          <p>Available Data</p>
        ) : (
          <table>
         <div id='paymentsystemtopheader'>
            <div>S:No</div>
            <div>First Name</div>
            <div>Last Name</div>
            <div>Transport Id </div>
            <div>Site</div>
            <div>vat No</div>
            <div>Date</div>
            <div>No Of week</div>
          <div>Service Type</div>
            <div>Unit Rate</div>
            <div>Additional Service</div>
            <div>Miles</div>
            <div>Milages</div>
            <div>PeakInsentive</div>
            <div>Unit Rate</div>
            <div>Byod </div>
            <div>Deduction Rate</div>
            <div>Deduction Services</div>
            <div>Total Amount </div>
            <div>Status</div>

         </div>
          <tbody>
            {
              ScehueleRotaList.map((item, index) => {
                const matchingPaymentsystem = PaymentsystemList.find(payment => {
                  return payment.paymentdate === item.date && payment.transportId === item.transportId
                });
              
                console.log(item);
                return (
                  <tr key={index}>
                    <div  id='paymentsystem'>
                    <div>{item?.day}</div>
                    <div>{item?.drivefirstname}</div>
                    <div>{item?.drivelastname}</div>
                    <div>{item?.transportId}</div>
                    <div>{item?.site}</div>
                    <div>{matchingPaymentsystem?matchingPaymentsystem.vatnumber:0}</div>
                    <div>{item?.date}</div>
                    <div>{getWeekNumber(item?.date)}</div>
                  
                    <div>{item?.services}</div>
                    <div>{matchingPaymentsystem ? matchingPaymentsystem.unitrate:0}</div>
                    <div>{matchingPaymentsystem ? matchingPaymentsystem.servicestypeday1 : 0}</div>
                  
                    <div>{matchingPaymentsystem ? matchingPaymentsystem.miles: 0}</div>
                    <div>{matchingPaymentsystem? matchingPaymentsystem.milage : 0}</div>
                    <div>{matchingPaymentsystem ? matchingPaymentsystem.peakincentive : 0}</div>
                      <div>{matchingPaymentsystem ? matchingPaymentsystem.urate : 0}</div>
                      <div>{matchingPaymentsystem ? matchingPaymentsystem.brate : 0}</div>

                      <div>{matchingPaymentsystem ?matchingPaymentsystem.rate:0}</div>
                    <div>{matchingPaymentsystem ?matchingPaymentsystem.driverdeductionservices:0}</div>
                    <div></div>
                    <button
                       className='approve'
                       onClick={() => handleApprove(item, matchingPaymentsystem)}
                     >
                       Approve
                     </button>
                    <button onClick={()=>handleNotApproved(matchingPaymentsystem)} className='not-app'>Not Approveed</button>
                    </div>
                  </tr>


                )

              })
            }
           
          </tbody>
         </table>
        )}
      </div>
    </>
  );
}
