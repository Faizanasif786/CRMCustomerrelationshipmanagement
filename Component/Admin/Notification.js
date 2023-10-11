import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import Navbar from '../Navbar';

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

export default function RealTimeData() {
  const [formDataList, setFormDataList] = useState([]);

  useEffect(() => {
    const dataRef = ref(database, 'ContactForm');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const formDataArray = [];
      snapshot.forEach((childSnapshot) => {
        const formData = childSnapshot.val();
        formDataArray.push(formData);
      });

      // Filter the form data to only include entries with "Driving License Validity Until" below 91 days
      const filteredFormDataArray = formDataArray.filter((formData) => {
        const expiryDate = new Date(formData.drivingLicenseValidityUntil);
        const today = new Date();
        const timeDifferenceExpiry = expiryDate.getTime() - today.getTime();
        const daysRemainingExpiry = Math.ceil(timeDifferenceExpiry / (1000 * 3600 * 24));
        return daysRemainingExpiry < 91;
      });

      setFormDataList(filteredFormDataArray);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function getDaysRemaining(expiryDate) {
    const today = new Date();
    const timeDifference = new Date(expiryDate).getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysRemaining;
  }

  function getDaysRemainingColor(expiryDate) {
    const today = new Date();
    const timeDifferenceExpiry = new Date(expiryDate).getTime() - today.getTime();
    const daysRemainingExpiry = Math.ceil(timeDifferenceExpiry / (1000 * 3600 * 24));

    if (daysRemainingExpiry === 0) {
      return 'expired';
    } else if (daysRemainingExpiry >= 61 && daysRemainingExpiry <= 90) {
      return 'green';
    } else if (daysRemainingExpiry >= 31 && daysRemainingExpiry <= 60) {
      return 'yellow';
    } else if (daysRemainingExpiry >= 1 && daysRemainingExpiry <= 30) {
      return 'red';
    } else {
      return 'inherit'; // Default color if daysRemainingExpiry > 90
    }
  }

  return (
    <>
      <Navbar />
      <div>
      <h1 className='profileData'>Notification</h1>
      {formDataList.length === 0 ? (
        <p>Current Notification</p>
      ) : (
        <table>
          {/* Table header */}
          <thead>
            <tr>
              <th>Transport Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Driving License Validity Until</th>
              <th>No Of Days Left</th>
              <th>GT Expiry</th>
              <th>No Of Days Left</th>
              {/* Add more headers for other expiries */}
              <th>PL Expiry</th>
              <th>No Of Days Left</th>
              <th>H & R Expiry</th>
              <th>No Of Days Left</th>
              <th>ECS Expiry</th>
              <th>No Of Days Left</th>
              <th>Passport Expiry</th>
              <th>No Of Days Left</th>
              <th>D R Expiry</th>
              <th>No Of Days Left</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {formDataList.map((formData, index) => {
              // Calculate days remaining for different expiries
              const drivingLicenseDaysRemaining = getDaysRemaining(formData.drivingLicenseValidityUntil);
              const GTDaysRemaining = getDaysRemaining(formData.GoodsTransitexpiry);
              const PLDaysRemaining = getDaysRemaining(formData.PLexpiry);
              const HRDaysRemaining = getDaysRemaining(formData.HRexpiry);
              const ecsDaysRemaining = getDaysRemaining(formData.ecsCheckValidUntil);
              const passportDaysRemaining = getDaysRemaining(formData.passportexpiry);
              const rightToWorkDaysRemaining = getDaysRemaining(formData.rightToWorkDocumentValidUntil);

              return (
                <tr key={index}>
                  <td>{formData.transportId}</td>
                  <td>{formData.firstName}</td>
                  <td>{formData.lastName}</td>
                  <td>{formData.drivingLicenseValidityUntil}</td>
                  <td style={{ color: drivingLicenseDaysRemaining <= 90 ? (drivingLicenseDaysRemaining <= 0 ? 'expired' : 'red') : 'inherit' }}>
                    {drivingLicenseDaysRemaining <= 90
                      ? drivingLicenseDaysRemaining <= 0
                        ? 'Your license has been expired'
                        : `${drivingLicenseDaysRemaining} days remaining`
                      : '----'}
                  </td>
                  <td>{formData.GoodsTransitexpiry}</td>
                  <td style={{ color: getDaysRemainingColor(formData.GoodsTransitexpiry) }}>
                    {getDaysRemainingColor(formData.GoodsTransitexpiry) === 'expired'
                      ? 'Your Goods Transit has been expired'
                      : GTDaysRemaining <= 90
                        ? GTDaysRemaining <= 0
                          ? 'Your Goods Transit has been expired'
                          : `${GTDaysRemaining} days remaining`
                        : '----'}
                  </td>
                  {/* Add more cells for other expiries and days left */}
                  <td>{formData.PLexpiry}</td>
                  <td style={{ color: getDaysRemainingColor(formData.PLexpiry) }}>
                    {getDaysRemainingColor(formData.PLexpiry) === 'expired'
                      ? 'Your PL has been expired'
                      : PLDaysRemaining <= 90
                        ? PLDaysRemaining <= 0
                          ? 'Your PL has been expired'
                          : `${PLDaysRemaining} days remaining`
                        : '----'}
                  </td>
                  <td>{formData.HRexpiry}</td>
                  <td style={{ color: getDaysRemainingColor(formData.HRexpiry) }}>
                    {getDaysRemainingColor(formData.HRexpiry) === 'expired'
                      ? 'Your H & R has been expired'
                      : HRDaysRemaining <= 90
                        ? HRDaysRemaining <= 0
                          ? 'Your H & R has been expired'
                          : `${HRDaysRemaining} days remaining`
                        : '----'}
                  </td>
                  <td>{formData.ecsCheckValidUntil}</td>
                  <td style={{ color: getDaysRemainingColor(formData.ecsCheckValidUntil) }}>
                    {getDaysRemainingColor(formData.ecsCheckValidUntil) === 'expired'
                      ? 'Your ECS has been expired'
                      : ecsDaysRemaining <= 90
                        ? ecsDaysRemaining <= 0
                          ? 'Your ECS has been expired'
                          : `${ecsDaysRemaining} days remaining`
                        : '----'}
                  </td>
                  <td>{formData.passportexpiry}</td>
                  <td style={{ color: getDaysRemainingColor(formData.passportexpiry) }}>
                    {getDaysRemainingColor(formData.passportexpiry) === 'expired'
                      ? 'Your passport has been expired'
                      : passportDaysRemaining <= 90
                        ? passportDaysRemaining <= 0
                          ? 'Your passport has been expired'
                          : `${passportDaysRemaining} days remaining`
                        : '----'}
                  </td>
                  <td>{formData.rightToWorkDocumentValidUntil}</td>
                  <td style={{ color: getDaysRemainingColor(formData.rightToWorkDocumentValidUntil) }}>
                    {getDaysRemainingColor(formData.rightToWorkDocumentValidUntil) === 'expired'
                      ? 'Your right to work document has been expired'
                      : rightToWorkDaysRemaining <= 90
                        ? rightToWorkDaysRemaining <= 0
                          ? 'Your right to work document has been expired'
                          : `${rightToWorkDaysRemaining} days remaining`
                        : '----'}
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
