import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';


import { getDatabase, ref, push ,onValue } from 'firebase/database';
import Navbar from '../Navbar';
import { set } from 'date-fns';

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
  const [rotapayment, setrotapayment] = useState([]);
  const [approvedServices, setApprovedServices] = useState([]);
  const mergedData = [];
  const [passedDates, setPassedDates] = useState([]);
  
  const sendApprovalToFirebase = (data) => {
    const newApprovalRef = push(ref(database, 'Approvals'));
    push(newApprovalRef, data);
  };

  const handleApprove = (matchingPaymentsystem) => {
    console.log(matchingPaymentsystem)
    // sendApprovalToFirebase(matchingPaymentsystem);
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
        const Paymentsystem = childSnapshot.val();
        PaymentsystemArray.push(Paymentsystem);
      });
      setPaymentsystemList(PaymentsystemArray);
    });


    // ScehueleRotaList.forEach((scehueleRota) => {
    //   PaymentsystemList.forEach((payment) => {
    //     if (
    //       payment.transportId === scehueleRota.transportId &&
    //       (payment.paymentdate === scehueleRota.dayonedate ||
    //         payment.dayonedate === scehueleRota.daytwodate ||
    //         payment.dayonedate === scehueleRota.daythreedate ||
    //         payment.dayonedate === scehueleRota.dayfourdate ||
    //         payment.dayonedate === scehueleRota.dayfivedate ||
    //         payment.dayonedate === scehueleRota.daysixdate)
    //     ) {
    //       mergedData.push({
    //         ScehueleRota: {
    //           drivefirstname: scehueleRota.drivefirstname,
    //           drivelastname: scehueleRota.drivelastname,
    //           transportId: scehueleRota.transportId,
    //           site: scehueleRota.site,
    //           weekNumber: getWeekNumber(scehueleRota.dayonedate),
    //           daydate: {
    //             dayonedate: scehueleRota.dayonedate,
    //             daytwodate: scehueleRota.daytwodate,
    //             daythreedate: scehueleRota.daythreedate,
    //             dayfourdate: scehueleRota.dayfourdate,
    //             dayfivedate: scehueleRota.dayfivedate,
    //             daysixdate: scehueleRota.daysixdate,
    //           },
    //           services: {
    //             servicestypeday1: scehueleRota.servicestypeday1,
    //             servicestypeday2: scehueleRota.servicestypeday2,
    //             servicestypeday3: scehueleRota.servicestypeday3,
    //             servicestypeday4: scehueleRota.servicestypeday4,
    //             servicestypeday5: scehueleRota.servicestypeday5,
    //             servicestypeday6: scehueleRota.servicestypeday6,
    //           },
    //         },
    //         Paymentsystem: {
    //           addtional: payment.addtional,
    //           miles: payment.miles,
    //           milage: payment.milage,
    //           peakincentive: payment.peakincentive,
    //         }
    //         // Add other properties as needed
    //       });
    //     }
    //   });
    // });

    ScehueleRotaList.forEach((scehueleRota) => {
      PaymentsystemList.forEach((payment) => {
        if ( scehueleRota.transportId === payment.transportId ){
          if ( payment.paymentdate === scehueleRota.dayonedate ){
            mergedData.push({
              dayonedate: scehueleRota.dayonedate,
            })
            // setPassedDates([...passedDates, scehueleRota.dayonedate])
          } 
          if ( payment.paymentdate === scehueleRota.daytwodate ){
            mergedData.push({
              daytwodate: scehueleRota.daytwodate,
            })
            // setPassedDates([...passedDates, scehueleRota.daytwodate])
          }
          if ( payment.paymentdate === scehueleRota.daythreedate ){
            mergedData.push({
              daythreedate: scehueleRota.daythreedate,
            })
            // setPassedDates([...passedDates, scehueleRota.daythreedate])
          }
          if ( payment.paymentdate === scehueleRota.dayfourdate ){
            mergedData.push({
              dayfourdate: scehueleRota.dayfourdate,
            })
            // setPassedDates([...passedDates, scehueleRota.dayfourdate])
          }
          if ( payment.paymentdate === scehueleRota.dayfivedate ){
            mergedData.push({
              dayfivedate: scehueleRota.dayfivedate,
            })
            // setPassedDates([...passedDates, scehueleRota.dayfivedate])
          }
          if ( payment.paymentdate === scehueleRota.daysixdate ){
            mergedData.push({
              daysixdate: scehueleRota.daysixdate,
            })
            // setPassedDates([...passedDates, scehueleRota.daysixdate])
          }
        }
      })
    })

      setrotapayment(mergedData)
      console.log(mergedData)

    return () => {
      unsubscribeScehueleRota();
      unsubscribePaymentsystem();
    };
  }, []);





  
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
            <div>Date</div>
            <div>No Of week</div>
            <div>Service Type</div>
            <div>Additional Service</div>
            <div>Miles</div>
            <div>Milages</div>
            <div>PeakInsentive</div>
            <div>Status</div>
         </div>
            <tbody>
              
            {rotapayment.map((ScehueleRota, index) => {
                const matchingPaymentsystem = PaymentsystemList.filter(
           
                    (payment) =>
                    payment.transportId === ScehueleRota.transportId &&
                    (payment.paymentdate === ScehueleRota.dayonedate ||
                        payment.paymentdate === ScehueleRota.daytwodate ||
                        payment.paymentdate === ScehueleRota.daythreedate ||
                        payment.paymentdate === ScehueleRota.dayfourdate ||
                        payment.paymentdate === ScehueleRota.dayfivedate ||
                        payment.paymentdate === ScehueleRota.daysixdate)     
                   
                );


                const approvalData = {
                    ScehueleRota: {
                      drivefirstname: ScehueleRota.drivefirstname,
                      drivelastname: ScehueleRota.drivelastname,
                      transportId: ScehueleRota.transportId,
                      site:ScehueleRota.site,
                      dayonedate: ScehueleRota.dayonedate,
                      weekNumber: getWeekNumber(ScehueleRota.dayonedate),
                      servicestype: ScehueleRota.servicestypeday1,
                    },
                    Paymentsystem: matchingPaymentsystem || null,

                    }
                
                // const approvalData = {
                //   ScehueleRota: {
                //     drivefirstname: ScehueleRota.drivefirstname,
                //     drivelastname: ScehueleRota.drivelastname,
                //     transportId: ScehueleRota.transportId,
                //     site:ScehueleRota.site,
                //     // site: matchingPaymentsystem ? matchingPaymentsystem.site : '',
                //     // ... (other properties)
                //   },
                //   Paymentsystem: matchingPaymentsystem || null,
                // };
              
                return (
                    <tr key={index}>
                      <div id='paymentsystem'>
                      <div> {index + 1}</div>
                      <div> {approvalData.ScehueleRota.drivefirstname}</div>
                      <div>{approvalData.ScehueleRota.drivelastname}</div>
                      <div>{approvalData.ScehueleRota.transportId}</div>
                      <div>{approvalData.ScehueleRota.site}</div>
                      <div>{approvalData.ScehueleRota.dayonedate}</div>
                      <div>{approvalData.ScehueleRota.weekNumber}</div>
                      <div>{approvalData.ScehueleRota.servicestype}</div>
                      {approvalData.Paymentsystem ? (
                        <>
                          <div>{approvalData.Paymentsystem.addtional}</div>
                          <div>{approvalData.Paymentsystem.miles}</div>
                          <div>{approvalData.Paymentsystem.milage}</div>
                          <div>{approvalData.Paymentsystem.peakincentive}</div>
                        </>
                      ) : (
                        <>
                          <div colSpan={4}>0</div>
                          <div colSpan={4}>0</div>
                          <div colSpan={4}>0</div>
                          <div colSpan={4}>0</div>
                        </>
                      )}
                      <button
                        className='approve'
                        onClick={() => handleApprove(approvalData)}
                      >
                        Approve
                      </button>
                      <button className='not-app'>Not Approveed</button>
                      </div>
                    </tr>
//                   <tr key={index}>
//                     {/* day 1  */}
//                     <div id='paymentsystem'>
//                     <div> 1</div>
//                     <div> {ScehueleRota.drivefirstname}</div>
//                 <div>{ScehueleRota.drivelastname}</div>
//                 <div> {ScehueleRota.transportId}</div>
//                 <div > {ScehueleRota.site}</div>
           
//                 <div> {ScehueleRota.dayonedate}</div>
//                 <div>{getWeekNumber(ScehueleRota.dayonedate)}</div>
//                 <div className='site'> {ScehueleRota.servicestypeday1}</div>
//                 {matchingPaymentsystem ? (
//                       <>
                      
//                       <div>{matchingPaymentsystem.addtional}</div>
//                       <div>{matchingPaymentsystem.miles}</div>
//                       <div>{matchingPaymentsystem.milage}</div>
//                         <div>{matchingPaymentsystem.peakincentive}</div>   
                  
//                       </>
//                     ) : (
//                         <>
//                       <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                       </>

//                     )}
//               <button
//                       className='approve'
//                       onClick={() => handleApprove(matchingPaymentsystem)}
//                     >
//                       Approve
//                     </button>
//                    <button className='not-app'>Not Approveed</button>
//                 </div>
// {/* day 1  */}
// <div id='paymentsystem'>
//                     <div>2</div>
//                     <div> {ScehueleRota.drivefirstname}</div>
//                 <div>{ScehueleRota.drivelastname}</div>
//                 <div> {ScehueleRota.transportId}</div>
//                 <div > {ScehueleRota.site}</div>
              
//                 <div> {ScehueleRota.daytwodate}</div>
//                 <div>{getWeekNumber(ScehueleRota.daytwodate)}</div>
//                 <div className='site'> {ScehueleRota.servicestypeday2}</div>
//                 {matchingPaymentsystem ? (
//                       <>
//                       <div>{matchingPaymentsystem.addtional}</div>
//                       <div>{matchingPaymentsystem.miles}</div>
//                       <div>{matchingPaymentsystem.milage}</div>
//                         <div>{matchingPaymentsystem.peakincentive}</div>   
//                       </>
//                     ) : (
//                         <>
//                       <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                       </>

//                     )}
//                                                       <button
//                       className='approve'
//                       onClick={() => handleApprove(matchingPaymentsystem)}
//                     >
//                       Approve
//                     </button>
//                    <button className='not-app'>Not Approveed</button>
//                 </div>


//                 <div id='paymentsystem'>
//                     <div> 3</div>
//                     <div> {ScehueleRota.drivefirstname}</div>
//                 <div>{ScehueleRota.drivelastname}</div>
//                 <div> {ScehueleRota.transportId}</div>
//                 <div > {ScehueleRota.site}</div>
    
//                 <div> {ScehueleRota.daythreedate}</div>
//                 <div>{getWeekNumber(ScehueleRota.daythreedate)}</div>
//                 <div className='site'> {ScehueleRota.servicestypeday3}</div>
//                 {matchingPaymentsystem ? (
//                       <>
//                       <div>{matchingPaymentsystem.addtional}</div>
//                       <div>{matchingPaymentsystem.miles}</div>
//                       <div>{matchingPaymentsystem.milage}</div>
//                         <div>{matchingPaymentsystem.peakincentive}</div>   
//                       </>
//                     ) : (
//                         <>
//                       <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                       </>

//                     )}
//                                                      <button
//                       className='approve'
//                       onClick={() => handleApprove(matchingPaymentsystem)}
//                     >
//                       Approve
//                     </button>
//                    <button className='not-app'>Not Approveed</button>
//                 </div>

//                 <div id='paymentsystem'>
//                     <div> 4</div>
//                     <div> {ScehueleRota.drivefirstname}</div>
//                 <div>{ScehueleRota.drivelastname}</div>
//                 <div> {ScehueleRota.transportId}</div>
//                 <div > {ScehueleRota.site}</div>

//                 <div> {ScehueleRota.dayfourdate}</div>
//                 <div>{getWeekNumber(ScehueleRota.dayfourdate)}</div>
//                 <div className='site'> {ScehueleRota.servicestypeday4}</div>
//                 {matchingPaymentsystem ? (
//                       <>
//                       <div>{matchingPaymentsystem.addtional}</div>
//                       <div>{matchingPaymentsystem.miles}</div>
//                       <div>{matchingPaymentsystem.milage}</div>
//                         <div>{matchingPaymentsystem.peakincentive}</div>   
//                       </>
//                     ) : (
//                         <>
//                       <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                      <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                       </>

//                     )}
//                                                      <button
//                       className='approve'
//                       onClick={() => handleApprove(matchingPaymentsystem)}
//                     >
//                       Approve
//                     </button>
//                    <button className='not-app'>Not Approveed</button>
//                 </div>

//                 <div id='paymentsystem'>
//                     <div>5</div>
//                     <div> {ScehueleRota.drivefirstname}</div>
//                 <div>{ScehueleRota.drivelastname}</div>
//                 <div> {ScehueleRota.transportId}</div>
//                 <div > {ScehueleRota.site}</div>
  
//                 <div> {ScehueleRota.dayfivedate}</div>
//                 <div>{getWeekNumber(ScehueleRota.dayfivedate)}</div>
//                 <div className='site'> {ScehueleRota.servicestypeday5}</div>
//                 {matchingPaymentsystem ? (
//                       <>
//                       <div>{matchingPaymentsystem.addtional}</div>
//                       <div>{matchingPaymentsystem.miles}</div>
//                       <div>{matchingPaymentsystem.milage}</div>
//                         <div>{matchingPaymentsystem.peakincentive}</div>   
//                       </>
//                     ) : (
//                         <>
//                       <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                       </>

//                     )}
//                                         <button className='approve'>Approve</button>
//                     <button className='not-app'>Not Approveed</button>
//                 </div>

//                 <div id='paymentsystem'>
//                     <div>6</div>
//                     <div> {ScehueleRota.drivefirstname}</div>
//                 <div>{ScehueleRota.drivelastname}</div>
//                 <div> {ScehueleRota.transportId}</div>
//                 <div > {ScehueleRota.site}</div>
    
//                 <div> {ScehueleRota.daysixdate}</div>
//                 <div>{getWeekNumber(ScehueleRota.daysixdate)}</div>
//                 <div className='site'> {ScehueleRota.servicestypeday6}</div>
//                 {matchingPaymentsystem ? (
//                       <>
//                       <div>{matchingPaymentsystem.addtional}</div>
//                       <div>{matchingPaymentsystem.miles}</div>
//                       <div>{matchingPaymentsystem.milage}</div>
//                         <div>{matchingPaymentsystem.peakincentive}</div>   
//                       </>
//                     ) : (
//                         <>
//                       <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                       <div colSpan={4}>0</div>
//                       </>

//                     )}  
//                                                    <button
//                       className='approve'
//                       onClick={() => handleApprove(matchingPaymentsystem)}
//                     >
//                       Approve
//                     </button>
//                    <button className='not-app'>Not Approveed</button>
//                 </div>
   
//                   </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
