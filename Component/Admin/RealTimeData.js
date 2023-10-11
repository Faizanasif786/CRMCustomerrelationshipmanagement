import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Move the database reference here

export default function RealTimeData() {
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

  return (
    <>
      <Navbar />
      <div>
        <h1 className='profileData'>Driver Profile Data</h1>
        {formDataList.length === 0 ? (
          <p>No Profile Data Available</p>
        ) : (
          
          <table>
            <thead>
              <tr>
                <th>Profile Image</th>
                <th>Date Of Joining</th>
                <th>Days Since Joining</th> {/* New column */}
                <th>Transport ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Nationality</th>
                <th>Goods Transit Number</th>
                <th>Goods Transit Validity</th>
                <th>Goods Transit Expiry</th>
                <th>PL Insurance Number</th>
                <th>PL Validity</th>
                <th>PL Expiry</th>
                <th>Hire and Reward Insurance</th>
                <th>Hire and Reward Validity</th>
                <th>Hire and Reward Expiry</th>
                <th>UTR No</th>
                <th>VAT No</th>
                <th>Address</th>
                <th>Postcode</th>
                <th>National Insurance Number</th>
                <th>Bank Name</th>
                <th>Sort Code</th>
                <th>Bank Account Number</th>
                <th>Driving License Number</th>
             
                <th>Driving License Validity From</th>
                <th>Driving License Validity Until</th>
                <th>ID Type - Passport Only</th>
                <th>Passport Validity</th>
                <th>Passport Expiry</th>
                <th>ECS Check Applied Date</th>
                <th>ECS Check Valid Until</th>
                <th>Right to Work Document Applied Date</th>
                <th>Right to Work Document Valid Until</th>
                <th>Company Van / Owner Van</th>
                <th>Site</th>
                <th>Insurance Card Image</th>
                <th>Driving License Image</th>
                <th>Driving Licence Front</th>
                <th>Driving Licence Back</th>
                <th>Passport Image</th>
                <th>ECS Image</th>
                <th>Other Images </th>
                <th>Other Images </th>
              </tr>
            </thead>
            <tbody>
              {formDataList.map((formData, index) => {
                // Calculate the number of days from the joining date till today
                const joiningDate = new Date(formData.dataofjoining);
                const today = new Date();
                const timeDifference = today.getTime() - joiningDate.getTime();
                const daysSinceJoining = Math.ceil(timeDifference / (1000 * 3600 * 24));

                return (
                  <tr key={index}>
                    <td>
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt="Profile"
                          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                        />
                      )}
                    </td>
                    <td>{formData.dataofjoining}</td>
                    <td>{daysSinceJoining}</td> {/* Display the calculated number of days */}
                    <td>{formData.transportId}</td>
                    <td>{formData.firstName}</td>
                    <td>{formData.lastName}</td>
                    <td>{formData.nationality}</td>
                    <td>{formData.GoodsTransitNumber}</td>
                    <td>{formData.GoodsTransitValidity}</td>
                    <td>{formData.GoodsTransitexpiry}</td>
                    <td>{formData.PLInsuranceNumber}</td>
                    <td>{formData.PLValidity}</td>
                    <td>{formData.PLexpiry}</td>
                    <td>{formData.Hireandrewardnumber}</td>
                    <td>{formData.HRValidity}</td>
                    <td>{formData.HRexpiry}</td>
                    <td>{formData.utrNo}</td>
                    <td>{formData.vatNo}</td>
                    <td>{formData.address}</td>
                    <td>{formData.postcode}</td>
                    <td>{formData.nationalInsuranceNumber}</td>
                    <td>{formData.bankName}</td>
                    <td>{formData.sortCode}</td>
                    <td>{formData.bankAccountNumber}</td>
                    <td>{formData.drivingLicenseNumber}</td>
                    <td>{formData.drivingLicenseValidityFrom}</td>
                    <td>{formData.drivingLicenseValidityUntil}</td>
                    <td>{formData.idTypePassportOnly}</td>
                    <td>{formData.passportexpiry}</td>
                    <td>{formData.passportvalidity}</td>
                    <td>{formData.ecsCheckAppliedDate}</td>
                    <td>{formData.ecsCheckValidUntil}</td>
                    <td>{formData.rightToWorkDocumentAppliedDate}</td>
                    <td>{formData.rightToWorkDocumentValidUntil}</td>
                    <td>{formData.companyVanOrOwnerVan}</td>
                    <td>{formData.site}</td>
                    <td>
                      {formData.imageinsurancecard && (
                        <img
                          src={formData.imageinsurancecard}
                          alt="Insurance Card"
                          style={{ width: '50px', height: '50px' }}
                        />
                      )}
                    </td>
                    <td>
                      {formData.imagedrivinglicence && (
                        <img
                          src={formData.imagedrivinglicence}
                          alt="Driving License"
                          style={{ width: '50px', height: '50px' }}
                        />
                      )}
                    </td>
                    <td>
                      {formData.imagedrivinglicencefront && (
                        <img
                          src={formData.imagedrivinglicencefront}
                          alt="Driving License Front"
                          style={{ width: '50px', height: '50px' }}
                        />
                      )}
                    </td>
                    <td>
                      {formData.imagedrivinglicenceback && (
                        <img
                          src={formData.imagedrivinglicenceback}
                          alt="Driving License Front"
                          style={{ width: '50px', height: '50px' }}
                        />
                      )}
                    </td>

                   
                    <td>
                      {formData.imagepassport && (
                        <img
                          src={formData.imagepassport}
                          alt="Passport"
                          style={{ width: '50px', height: '50px' }}
                        />
                      )}
                    </td>
                    <td>
                      {formData.imageecsimage && (
                        <img
                          src={formData.imageecsimage}
                          alt="ECS Image"
                          style={{ width: '50px', height: '50px' }}
                        />
                      )}
                    </td>
                    <td>
                      {formData.otherimage && (
                        <img
                          src={formData.otherimage}
                          alt="otherimage"
                          style={{ width: '50px', height: '50px' }}
                        />
                      )}
                    </td>
                    <td>
                      {formData.otherimage2 && (
                        <img
                          src={formData.otherimage2}
                          alt="otherimage2"
                          style={{ width: '50px', height: '50px' }}
                        />
                      )}
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
