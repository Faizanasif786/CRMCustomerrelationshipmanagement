
// import React from 'react'
// import Navbar from '../Navbar'

// export default function Profile() {

//   function FormSubmit(){
//     const image = document.getElementById('Image').value;
//     const Transportid = document.getElementById('Transportid').value;
//     const Nationality = document.getElementById('Nationality').value;
//     const drivefirstname = document.getElementById('drivefirstname').value;
//     const transportId = document.getElementById('transportId').value;
//     const UTRNo = document.getElementById('UTRNo').value;
//     const VatNo = document.getElementById('VatNo').value;
    
//   }


//   return (
//     <>
//     <Navbar/>
//     <div className='driver-registration-heading'>
//     <h1>Driver Registration Form</h1>
//     </div>
//     <div id='profile-Form'>
//       <div>
//         <input type='File' name='image' placeholder='Upload' id='Image'/>
//         </div>
//         <input type="text" name="Transportid" id="Transportid" placeholder="Enter Your Transport ID" required/>
//         <input type="text" name="Nationality" id="Nationality" placeholder='Enter Your Nationality'/>
//         <input type="text" name="First Name" id="drivefirstname" placeholder="Enter Your First Name"/>
//         <input type="text" name="Last Name" id="transportId" placeholder="Enter Your Last Name"/>
//         <input type="text" name="UTR No" id="UTRNo" placeholder="Enter Your UTR No "/>
//         <input type="text" name="VatNo" id="VatNo" placeholder="Enter Your Vat No"/>
//         <input type="text" name="Address" id="Address" placeholder="Enter Your Address"/>
//         <input type="text" name="Postcode" id="Postcode" placeholder="Enter Your Postcode"/>
//         <input type="text" name="National Insurance Number" id="National Insurance Number" placeholder="Enter Your National Insurance Number"/>
//         <input type="text" name="Bank Name" id="Bank Name" placeholder="Enter Your Bank Name"/>
//         <input type="text" name="Sort Code" id=" Sort Code" placeholder="Enter Your Sort Code"/>
//         <input type="text" name="Bank Account Number" id="Bank Account Number" placeholder="Enter Your Bank Account Number"/>
//         <input type="text" name="Driving License Number" id="Driving License Number" placeholder="Enter Your Driving License Number"/>
//         <input type="Driving License Validity From " name="Driving License Validity From " id="Driving License Validity From" placeholder="Enter Your Driving License Validity From "/>
//         <input type="text" name=" Driving License Validity Until" id=" Driving License Validity Until" placeholder="Enter Your Driving License Validity Until"/>
//         <input type="text" name=" ID Type Passport Only" id=" ID TypePassportOnly" placeholder="Enter Your ID Type - Passport Only"/>
//         <input type="text" name="ECS Check Applied Date" id="ECS Check Applied Date" placeholder="Enter Your ECS Check Applied Date"/>
//         <input type="text" name="ECS Check Valid Until" id="ECS Check Valid Until " placeholder="Enter Your ECS Check Valid Until"/>
//         <input type="text" name="Right to work document Applied Date" id="Right to work document Applied Date" placeholder="Enter Your Right to work document Applied Date"/>
//         <input type="text" name="Right to work document Valid Until" id="Right to work document Valid Until" placeholder="Enter Your Right to work document Valid Until"/>
//       <div id='Slect-Dropdown'>       
//         <select name="" id="">
//           <option value=""> Select company van / Owner van</option>
//           <option value="">Company Van</option>
//           <option value="">Owner van</option>
//         </select>
//         <select name="" id="">
//         <option value="">Select Site</option>
//           <option value="">DP R1 - LeyLand</option>
//           <option value="">DXM3 - Rochdale</option>
//           <option value="">DXM2 - Manchester</option>
//           <option value="">DXM5 - Bolton</option>
//         </select>
//         </div>
//       <div id='profile-Btn'>
//         <button id='Submit' type='submit' onClick={FormSubmit}>Submit</button>
//         </div>
//       </div>
//       </>
//   )
// }


import React, { useState } from 'react';
import Navbar from '../Navbar';
import { initializeApp } from 'firebase/app';
import { getFirestore, } from 'firebase/firestore';
import { getDatabase, ref, push } from 'firebase/database';

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



export default function SceheduleRota() {
  // Get a reference to the Firestore database
  const db = getFirestore(app);

  // Get a reference to the Realtime Database
  const database = getDatabase(app);
  const [PaymentSystem, setPaymentSystem] = useState({
    peakincentive:'',
    paymentdate:'',
     drivefirstname: '',
     drivelastname:'',
    transportId: '',
    vatnumber:'',
    miles:'',
    milage:'',
    addtional:'',
    site:'',
    rate:'',
    driverdeductionservices:'',
    urate:'',
    unitrate:'',
   brate:'',

  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const selectedValue = e.target.value;
  // Remove any non-numeric characters and convert to a number
  const numericValue = parseFloat(selectedValue.replace(/[^\d.]/g, ''));

  if (!isNaN(numericValue)) {
    console.log('Selected value as a number:', numericValue);
  } else {
    console.log('Selected value is not a number');
  } 
    setPaymentSystem((prevPaymentSystem) => ({
      ...prevPaymentSystem,
      [name]: value,
      
    }));
  };

  

  
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      // Determine the name of the input field (e.g., image, imageinsurancecard, etc.)
      const fieldName = e.target.name;
  
      // Set the image data in base64 format to the respective PaymentSystem state field
      setPaymentSystem((prevPaymentSystem) => ({
        ...prevPaymentSystem,
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
    'peakincentive',
    'paymentdate',
      'transportId',
      'vatnumber',
      'miles',
      'milage',
      'addtional',
      'site',
      'rate',
      'driverdeductionservices',
      'drivefirstname',
      'drivelastname',
      'urate',
      'unitrate',
      'brate',
  
    
      // Add other required fields here
    ];
    
    const isAnyFieldBlank = requiredFields.some((field) => !PaymentSystem[field]);

    if (isAnyFieldBlank) {
      alert('Please fill all the given fields.');
  
    } else {
      alert('Add Successfull!');
      console.log('Form Data:', PaymentSystem); 
          // Add a new document to the "users" collection
    // const res = await fetch("https://crm-backend-cabb3-default-rtdb.firebaseio.com/users.json")
// Push data to the Realtime Database
push(ref(database, 'Paymentsystem'), {
  ...PaymentSystem,
  
});
       

 
   
    setPaymentSystem({
     
      peakincentive:'',
      paymentdate:'',
      miles:'',
      milage:'',
      addtional:'',
      transportId: '',
      vatnumber:'',
      site:'',
      rate:'',
      urate:'',
      unitrate:'',
     brate:'',
      driverdeductionservices:'',

      drivefirstname: '',
      drivelastname:'',
    

    });

  }
  };

  return (
    <>
      <Navbar />
      <div className='driver-registration-heading'>
        <h1>Additional Services</h1>
      </div>
      <div id='profile-Form'>
        <form>
       <input
            type='text'
            name='drivefirstname'
            placeholder='Enter Driver Name'
            value={PaymentSystem.drivefirstname}
            onChange={handleInputChange}
          />
           <input
            type='text'
            name='drivelastname'
            placeholder='Enter Driver Last Name'
            value={PaymentSystem.drivelastname}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='transportId'
            placeholder='Enter Transport Id'
            value={PaymentSystem.transportId}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='vatnumber'
            placeholder='Enter vat Number'
            value={PaymentSystem.vatnumber}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='miles'
            placeholder='Enter miles'
            value={PaymentSystem.miles}
            onChange={handleInputChange}
          />
           <input
            type='text'
            name='milage'
            placeholder='Enter milage'
            value={PaymentSystem.milage}
            onChange={handleInputChange}
          />
           <input
            type='text'
            name='addtional'
            placeholder='Enter addtional'
            value={PaymentSystem.addtional}
            onChange={handleInputChange}
          />
           <input
            type='text'
            name='peakincentive'
            placeholder='Enter peak incentive'
            value={PaymentSystem.peakincentive}
            onChange={handleInputChange}
          />
       
 <select
              name='site'
              value={PaymentSystem.site}
              onChange={handleInputChange}
            >
          
              <option value=''> 
                       Select Site
            </option>
          
        <option value='leyland'>Leyland</option>
        <option value='manchester'>Manchester</option>
        <option value='rochdale'>Rochdale</option>
        <option value='bolton'>Bolton</option>
            </select>
          <input type='date' name='paymentdate' value={PaymentSystem.paymentdate}  onChange={handleInputChange}/> 
      
            
            <select
              name='servicestypeday1'
              value={PaymentSystem.servicestypeday1}
              onChange={handleInputChange}
            >
          
              <option value=''> 
                       Services Type
            </option>
            <option value='Standard Parcel - 9 Hr'>Standard Parcel - 9 Hr</option>
            <option value='Standard Parcel - 9 Hr 30 Mins'>Standard Parcel - 9 Hr 30 Mins</option>
            <option value='Standard Parcel Large Van - 9 Hr'>Standard Parcel Large Van - 9 Hr</option>
            <option value='Standard Parcel Large Van - 9 Hr 30 Mins'>Standard Parcel Large Van - 9 Hr 30 Mins</option>
            <option value='Remote Debrief - 9 Hr'>Remote Debrief - 9 Hr</option>
            <option value='Nursery Route Level 1 - 9 Hr'>Nursery Route Level 1 - 9 Hr</option>
            <option value='Nursery Route Level 2 - 9 Hr'>Nursery Route Level 2 - 9 Hr</option>
            <option value='Classroom Training'>Classroom Training</option>
            <option value='Ride Along'>Ride Along</option>
            <option value='Rescue 2'>Rescue 2</option>
            <option value='Rescue 4'>Rescue 4 </option>
            <option value='Rescue 6 / Missort Delivery - 6 Hr'>Rescue 6 / Missort Delivery - 6 Hr</option>
            <option value='MFN Standard Full Van - 4 Hr'>MFN Standard Full Van - 4 Hr</option>
            <option value='MFN Standard Full Van - 5 Hr'>MFN Standard Full Van - 5 Hr</option>
            <option value='MFN Standard Full Van - 6 Hr'>MFN Standard Full Van - 6 Hr</option>
            <option value='MFN Standard Full Van - 8 Hr'>MFN Standard Full Van - 8 Hr</option>
            <option value='MFN Standard Full Van - 9 Hr'>MFN Standard Full Van - 9 Hr</option>
            <option value='MFN Luton VAN - 4 Hr'>MFN Luton VAN - 4 Hr</option>
            <option value='MFN Luton VAN - 6 Hr'>MFN Luton VAN - 6 Hr</option>
            <option value='MFN Pickup Large Full Van - 4 Hr'>MFN Pickup Large Full Van - 4 Hr</option>
            <option value='MFN Pickup Large Full Van - 5 Hr'>MFN Pickup Large Full Van - 5 Hr</option>
            <option value='MFN Pickup Large Full Van - 6 Hr'>MFN Pickup Large Full Van - 6 Hr</option>
            <option value='MFN Pickup Large Full Van - 8 Hr'>MFN Pickup Large Full Van - 8 Hr</option>
            <option value='MFN Pickup Large Full Van - 9 Hr'>MFN Pickup Large Full Van - 9 Hr</option>
            <option value='Standard Parcel - 9 Hr'>Standard Parcel - 9 Hr</option>
          <option value='Standard Parcel - 9 Hr 30 Mins'>Standard Parcel - 9 Hr 30 Mins</option>
          <option value='Standard Parcel Large Van - 9 Hr'>Standard Parcel Large Van - 9 Hr</option>
          <option value='Standard Parcel Large Van - 9 Hr 30 Mins'>Standard Parcel Large Van - 9 Hr 30 Mins</option>
          <option value='Remote Debrief - 9 Hr'>Remote Debrief - 9 Hr</option>
          <option value='Nursery Route Level 1 - 9 Hr'>Nursery Route Level 1 - 9 Hr</option>
          <option value='Nursery Route Level 2 - 9 Hr'>Nursery Route Level 2 - 9 Hr</option>
          <option value='Classroom Training'>Classroom Training</option>
          <option value='Ride Along'>Ride Along</option>
        <option value='Rescue 2'>Rescue 2</option>
        <option value='Rescue 4'>Rescue 4</option>
        <option value='Rescue 6 / Missort Delivery - 6 Hr'>Rescue 6 / Missort Delivery - 6 Hr</option>
        <option value='MFN Pickup Standard Full Van - 4 Hr'>MFN Pickup Standard Full Van - 4 Hr</option>
        <option value='MFN Pickup Standard Full Van - 5 Hr'>MFN Pickup Standard Full Van - 5 Hr</option>
        <option value='MFN Pickup Standard Full Van - 6 Hr'>MFN Pickup Standard Full Van - 6 Hr</option>
        <option value='MFN Pickup Standard Full Van - 8 Hr'>MFN Pickup Standard Full Van - 8 Hr</option>
        <option value='MFN Pickup Standard Full Van - 9 Hr'>MFN Pickup Standard Full Van - 9 Hr</option>
        <option value='MFN Pickup Luton VAN - 4 Hr'>MFN Pickup Luton VAN - 4 Hr</option>
        <option value='MFN Pickup Luton VAN - 6 Hr'>MFN Pickup Luton VAN - 6 Hr</option>
        <option value='MFN Pickup Large Full Van - 4 Hr'>MFN Pickup Large Full Van - 4 Hr</option>
        <option value='MFN Pickup Large Full Van - 5 Hr'>MFN Pickup Large Full Van - 5 Hr</option>
        <option value='MFN Pickup Large Full Van - 6 Hr'>MFN Pickup Large Full Van - 6 Hr</option>
        <option value='MFN Pickup Large Full Van - 8 H'>MFN Pickup Large Full Van - 8 Hr</option>
        <option value='MFN Pickup Large Full Van - 9 Hr'>MFN Pickup Large Full Van - 9 Hr</option>
            </select>

{/* day 1 end  */}
{/* unit rate  */}
<select name='unitrate' value={PaymentSystem.unitrate} onChange={handleInputChange}>
           
           <option value=''>Unit Rate </option>
    <option value='£ 103.20'>£ 103.20</option>
    <option value='£ 109.50'>£ 109.50</option>
    <option value='£ 110.20'>£ 110.20</option>
    <option value='£ 116.50'>£ 116.50</option>
    <option value='£ 103.20'>£ 103.20</option>
    <option value='£ 103.20'>£ 103.20</option>
    <option value='£ 103.20'>£ 103.20</option>
    <option value='£ 99.00'>£ 99.00</option>
    <option value='£ 99.00'>£ 99.00</option>
    <option value='£ 26'>£ 26</option>
    <option value='£ 49'>£ 49</option>
    <option value='£ 72'>£ 72</option>
    <option value='£ 48.2'>£ 48.2</option>
    <option value='£ 58.2'>£ 58.2</option>
    <option value='£ 70.2'>£ 70.2</option>
    <option value='£ 93.2'>£ 93.2</option>
    <option value='£ 103.2'>£ 103.2</option>
    <option value='£ 93.2'>£ 93.2</option>
    <option value='£ 108.2'>£ 108.2</option>
    <option value='£ 50.2'>£ 50.2</option>
    <option value='£ 62.2'>£ 62.2</option>
    <option value='£ 73.7'>£ 73.7</option>
    <option value='£ 97.7'>£ 97.7</option>
    <option value='£ 110.2'>£ 110.2</option>
    <option value='£ 140.52'>£ 140.52</option>
    <option value='£ 148.20'>£ 148.20</option>
    <option value='£ 156.35'>£ 156.35</option>
    <option value='£ 133.20'>£ 133.20</option>
    <option value='£ 133.20'>£ 133.20</option>
    <option value='£ 133.20'>£ 133.20</option>
    <option value='£ 99.00'>£ 99.00</option>
    <option value='£ 99.00'>£ 99.00</option>
    <option value='£ 39.56'>£ 39.56</option>
    <option value='£ 77.3'>£ 77.3</option>
    <option value='£ 118.7'>£ 118.7</option>
    <option value='£ 78.2'>£ 78.2</option>
    <option value='£ 83.2'>£ 83.2</option>
    <option value='£ 98.2'>£ 98.2</option>
    <option value='£ 118.2'>£ 118.2</option>
    <option value='£ 133.2'>£ 133.2</option>
    <option value='£ 133.2'>£ 133.2</option>
    <option value='£ 148.2'> £ 148.2</option>
    <option value='£ 98.2'>£ 98.2</option>
    <option value='£ 108.2'>£ 108.2</option>
    <option value='£ 118.2'> £ 118.2</option>
    <option value='£ 138.2'>£ 138.2</option>
    <option value='£ 148.2'>£ 148.2</option>	

           </select>

{/* unit rate end  */}





<input type='text' name='rate' value={PaymentSystem.rate}  onChange={handleInputChange} placeholder='Enter Deduction Rate'/> 
     
     <select name='driverdeductionservices' value={PaymentSystem.driverdeductionservices} onChange={handleInputChange}>

              <option value='' > 
                       Services Type
            </option>
            <option value='fuel'>fuel</option>
            <option value='fuel support '>fuel support </option>
            <option value='demage/repair cost'>demage/repair cost</option>
                   </select>

{/* unit rate  */}
                   <select name='urate'  value={PaymentSystem.urate} onChange={handleInputChange}>
           
                   <option value=''>Unit Rate </option>
            <option value='£ 103.20' >£ 103.20</option>
            <option value='£ 109.50'>£ 109.50</option>
            <option value='£ 110.20'>£ 110.20</option>
            <option value='£ 116.50'>£ 116.50</option>
            <option value='£ 103.20'>£ 103.20</option>
            <option value='£ 103.20'>£ 103.20</option>
            <option value='£ 103.20'>£ 103.20</option>
            <option value='£ 99.00'>£ 99.00</option>
            <option value='£ 99.00'>£ 99.00</option>
            <option value='£ 26'>£ 26</option>
            <option value='£ 49'>£ 49</option>
            <option value='£ 72'>£ 72</option>
            <option value='£ 48.2'>£ 48.2</option>
            <option value='£ 58.2'>£ 58.2</option>
            <option value='£ 70.2'>£ 70.2</option>
            <option value='£ 93.2'>£ 93.2</option>
            <option value='£ 103.2'>£ 103.2</option>
            <option value='£ 93.2'>£ 93.2</option>
            <option value='£ 108.2'>£ 108.2</option>
            <option value='£ 50.2'>£ 50.2</option>
            <option value='£ 62.2'>£ 62.2</option>
            <option value='£ 73.7'>£ 73.7</option>
            <option value='£ 97.7'>£ 97.7</option>
            <option value='£ 110.2'>£ 110.2</option>
            <option value='£ 140.52'>£ 140.52</option>
            <option value='£ 148.20'>£ 148.20</option>
            <option value='£ 156.35'>£ 156.35</option>
            <option value='£ 133.20'>£ 133.20</option>
            <option value='£ 133.20'>£ 133.20</option>
            <option value='£ 133.20'>£ 133.20</option>
            <option value='£ 99.00'>£ 99.00</option>
            <option value='£ 99.00'>£ 99.00</option>
            <option value='£ 39.56'>£ 39.56</option>
            <option value='£ 77.3'>£ 77.3</option>
            <option value='£ 118.7'>£ 118.7</option>
            <option value='£ 78.2'>£ 78.2</option>
            <option value='£ 83.2'>£ 83.2</option>
            <option value='£ 98.2'>£ 98.2</option>
            <option value='£ 118.2'>£ 118.2</option>
            <option value='£ 133.2'>£ 133.2</option>
            <option value='£ 133.2'>£ 133.2</option>
            <option value='£ 148.2'> £ 148.2</option>
            <option value='£ 98.2'>£ 98.2</option>
            <option value='£ 108.2'>£ 108.2</option>
            <option value='£ 118.2'> £ 118.2</option>
            <option value='£ 138.2'>£ 138.2</option>
            <option value='£ 148.2'>£ 148.2</option>	

                   </select>

{/* unit rate end  */}

{/* byod rate  */}
                   <select name='brate' value={PaymentSystem.brate} onChange={handleInputChange}>
                   <option value=''>Byod </option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£0.00'>£0.00</option>
            <option value='£0.00'>£0.00</option>
             <option value='none'>none</option>
            <option value='none'>none</option>
            <option value='none'>none</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£0.00'>£0.00</option>
            <option value='£0.00'>£0.00</option>
           <option value='none'>none</option>
            <option value='none'>none</option>
            <option value='none'>none</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
            <option value='£1.80'>£1.80</option>
             <option value='£1.80'>£1.80</option>
             <option value='£1.80'>£1.80</option>
             <option value='£1.80'>£1.80</option>
             <option value='£1.80'>£1.80</option>
             <option value='£1.80'>£1.80</option>
             <option value='£1.80'>£1.80</option>
             <option value='£1.80'>£1.80</option>
             <option value='£1.80'>£1.80</option>
             <option value='£1.80'>£1.80</option>

                   </select>

{/* Boyd rate end  */}


          <div id='profile-Btn'>
            <button id='Submit' onClick={handleSubmit}>
             Submit
            </button>
          </div>
        </form>
        
      </div>


     
    </>
  );
}
