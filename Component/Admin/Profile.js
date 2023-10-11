
// import React from 'react'
// import Navbar from '../Navbar'

// export default function Profile() {

//   function FormSubmit(){
//     const image = document.getElementById('Image').value;
//     const Transportid = document.getElementById('Transportid').value;
//     const Nationality = document.getElementById('Nationality').value;
//     const FirstName = document.getElementById('FirstName').value;
//     const LastName = document.getElementById('LastName').value;
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
//         <input type="text" name="First Name" id="FirstName" placeholder="Enter Your First Name"/>
//         <input type="text" name="Last Name" id="LastName" placeholder="Enter Your Last Name"/>
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



export default function Profile() {
  // Get a reference to the Firestore database
  const db = getFirestore(app);

  // Get a reference to the Realtime Database
  const database = getDatabase(app);
  const [formData, setFormData] = useState({
    dataofjoining: '',
    transportId: '',
    nationality: '',
    GoodsTransitNumber:'',
    GoodsTransitValidity:'',
    GoodsTransitexpiry:'',
    PLInsuranceNumber:'',
    PLValidity:'',
    PLexpiry:'',
    Hireandrewardnumber:'',
    HRValidity:'',
    HRexpiry:'',
    firstName: '',
    lastName: '',
    utrNo: '',
    vatNo: '',
    address: '',
    postcode: '',
    nationalInsuranceNumber: '',
    bankName: '',
    sortCode: '',
    bankAccountNumber: '',
    drivingLicenseNumber: '',
    drivingLicenseValidityFrom: '',
    drivingLicenseValidityUntil: '',
    idTypePassportOnly: '',
    passportvalidity:'',
    passportexpiry:'',
    ecsCheckAppliedDate: '',
    ecsCheckValidUntil: '',
    rightToWorkDocumentAppliedDate: '',
    rightToWorkDocumentValidUntil: '',
    companyVanOrOwnerVan: '',
    site: '',
    image: '',
    imageinsurancecard: '',
    imagedrivinglicence: '',
    imagedrivinglicencefront:'',
    imagedrivinglicenceback:'',
    drivinglicensefront: '',
drivinglicensback: '',
    imagepassport: '',
    imageecsimage: '',
    otherImage:'',
    otherimage2:'',
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      // Determine the name of the input field (e.g., image, imageinsurancecard, etc.)
      const fieldName = e.target.name;
  
      // Set the image data in base64 format to the respective formData state field
      setFormData((prevFormData) => ({
        ...prevFormData,
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
      'dataofjoining',
      'transportId',
      'nationality',
      'GoodsTransitNumber',
      'GoodsTransitValidity',
      'GoodsTransitexpiry',
      'PLInsuranceNumber',
      'PLValidity',
      'PLexpiry',
      'Hireandrewardnumber',
      'HRValidity',
      'HRexpiry',
      'firstName',
      'lastName',
      'utrNo',
      'vatNo',
      'address',
      'postcode',
      'nationalInsuranceNumber',
      'bankName',
      'sortCode',
      'bankAccountNumber',
      'drivingLicenseNumber',
      'drivingLicenseValidityFrom',
      'drivingLicenseValidityUntil',
   
      'idTypePassportOnly',
      'passportexpiry',
      'passportvalidity',
      'ecsCheckAppliedDate',
      'ecsCheckValidUntil',
      'rightToWorkDocumentAppliedDate',
      'rightToWorkDocumentValidUntil',
      'companyVanOrOwnerVan',
      'site',
      // Add other required fields here
    ];
    
    const isAnyFieldBlank = requiredFields.some((field) => !formData[field]);

    if (isAnyFieldBlank) {
      alert('Please fill all the given fields.');
  
    } else {
      alert('Thanks for your submission!');
      console.log('Form Data:', formData); 
          // Add a new document to the "users" collection
    // const res = await fetch("https://crm-backend-cabb3-default-rtdb.firebaseio.com/users.json")
// Push data to the Realtime Database
push(ref(database, 'ContactForm'), {
  ...formData,
  // Convert the image data back to a regular string for storage
  image: formData.image.toString(),
  imageinsurancecard:formData.imageinsurancecard.toString(),
  imagedrivinglicence:formData.imagedrivinglicence.toString(),
  imagedrivinglicenceback:formData.imagedrivinglicenceback.toString(),
  imagedrivinglicencefront:formData.imagedrivinglicencefront.toString(),
  imagepassport:formData.imagepassport.toString(),
  imageecsimage:formData.imageecsimage.toString(),
  otherImage:formData.otherImage.toString(),
  otherimage2:formData.otherimage2.toString(),
});
       

 
   
    setFormData({
      image: '',
      imageinsurancecard:'',
imagedrivinglicence:'',
imagedrivinglicencefront:'',
imagedrivinglicenceback:'',
imagepassport:'',
imageecsimage:'',
otherimage:'',
otherimage2:'',
      dataofjoining:'',
      transportId: '',
      nationality: '',
      GoodsTransitNumber:'',
      GoodsTransitValidity:'',
      GoodsTransitexpiry:'',
      PLInsuranceNumber:'',
      PLValidity:'',
      PLexpiry:'',
      Hireandrewardnumber:'',
      HRValidity:'',
      HRexpiry:'',
      firstName: '',
      lastName: '',
      dateofjoining:'',
      utrNo: '',
      vatNo: '',
      address: '',
      postcode: '',
      nationalInsuranceNumber: '',
      bankName: '',
      sortCode: '',
      bankAccountNumber: '',
      drivingLicenseNumber: '',
      drivingLicenseValidityFrom: '',
      drivingLicenseValidityUntil: '',
      drivinglicensefront: '',
drivinglicensback: '',
      idTypePassportOnly: '',
      passportvalidity:'',
      passportexpiry:'',
      ecsCheckAppliedDate: '',
      ecsCheckValidUntil: '',
      rightToWorkDocumentAppliedDate: '',
      rightToWorkDocumentValidUntil: '',
      companyVanOrOwnerVan: '',
      site: '',
    });

  }
  };

  return (
    <>
      <Navbar />
      <div className='driver-registration-heading'>
        <h1>Driver Registration Form</h1>
      </div>
      <div id='profile-Form'>
        <form>
         <div className='d-o-j'>
          <label for="" >Select Date Of Joining</label>
          <input type='date' name='dataofjoining' placeholder='Enter Date Of Joining'value={formData.dateofjoining}  onChange={handleInputChange}/>
          </div>
          <input
            type='text'
            name='transportId'
            placeholder='Enter Your Transport ID'
            value={formData.transportId}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='nationality'
            placeholder='Enter Your Nationality'
            value={formData.nationality}
            onChange={handleInputChange}
          />
          {/* Goods in Transit Insurance */}
            <input
            type='text'
            name='GoodsTransitNumber'
            placeholder='Goods in Transit Insurance'
            value={formData.GoodsTransitNumber}
            onChange={handleInputChange}
          />
           <br/>
          <label>GT Validity</label>
              <input
            type='date'
            name='GoodsTransitValidity'
            value={formData.GoodsTransitValidity}
            onChange={handleInputChange}
          />
         
           <label>GT Expiry</label>
              <input
            type='date'
            name='GoodsTransitexpiry'
            value={formData.GoodsTransitexpiry}
            onChange={handleInputChange}
          />
{/* Goods in Transit Insurance */}

 {/* Public Liability  Insurance */}
 <input
            type='text'
            name='PLInsuranceNumber'
            placeholder='PL Insurance Number'
            value={formData.PLInsuranceNumber}
            onChange={handleInputChange}
          />
           <br/>
          <label>PL Validity</label>
              <input
            type='date'
            name='PLValidity'
            value={formData.PLValidity}
            onChange={handleInputChange}
          />
         
           <label>PL Expiry</label>
              <input
            type='date'
            name='PLexpiry'
            value={formData.PLexpiry}
            onChange={handleInputChange}
          />
{/* Public Liability  Insurance */}

{/* Public Liability  Insurance */}
<input
            type='text'
            name='Hireandrewardnumber'
            placeholder='H & R Insurance'
            value={formData.Hireandrewardnumber}
            onChange={handleInputChange}
          />
           <br/>
          <label>H & R Validity</label>
              <input
            type='date'
            name='HRValidity'
            value={formData.HRValidity}
            onChange={handleInputChange}
          />
         
           <label>H & R Expiry</label>
              <input
            type='date'
            name='HRexpiry'
            value={formData.HRexpiry}
            onChange={handleInputChange}
          />
{/* Public Liability  Insurance */}

          <input
            type='text'
            name='firstName'
            placeholder='Enter Your First Name'
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='lastName'
            placeholder='Enter Your Last Name'
            value={formData.lastName}
            onChange={handleInputChange}
          />
        
          <input
            type='text'
            name='utrNo'
            placeholder='Enter Your UTR No'
            value={formData.utrNo}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='vatNo'
            placeholder='Enter Your Vat No'
            value={formData.vatNo}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='address'
            placeholder='Enter Your Address'
            value={formData.address}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='postcode'
            placeholder='Enter Your Postcode'
            value={formData.postcode}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='nationalInsuranceNumber'
            placeholder='Enter Your National Insurance Number'
            value={formData.nationalInsuranceNumber}
            onChange={handleInputChange}
          />
            
          <input
            type='text'
            name='bankName'
            placeholder='Enter Your Bank Name'
            value={formData.bankName}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='sortCode'
            placeholder='Enter Your Sort Code'
            value={formData.sortCode}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='bankAccountNumber'
            placeholder='Enter Your Bank Account Number'
            value={formData.bankAccountNumber}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='drivingLicenseNumber'
            placeholder='Enter Your Driving License Number'
            value={formData.drivingLicenseNumber}
            onChange={handleInputChange}
          />
        
                 
          <label>D L Validity</label>
   
          <input
            type='date'
            name='drivingLicenseValidityFrom'
            placeholder='Enter Your Driving License Validity'
            value={formData.drivingLicenseValidityFrom}
            onChange={handleInputChange}
          />
          <br/>
          <label>D L Expiry</label>
         
          <input
            type='date'
            name='drivingLicenseValidityUntil'
            placeholder='Enter Your Driving License Validity Expiry'
            value={formData.drivingLicenseValidityUntil}
            onChange={handleInputChange}
          />
         
         
          <label>ECS Validity</label>
          <input
            type='date'
            name='ecsCheckAppliedDate'
            placeholder='Enter Your ECS Check Applied Date'
            value={formData.ecsCheckAppliedDate}
            onChange={handleInputChange}
          />
            
          <label>ECS Expiry</label>
          <input
            type='date'
            name='ecsCheckValidUntil'
            placeholder='Enter Your ECS Check Valid Until'
            value={formData.ecsCheckValidUntil}
            onChange={handleInputChange}
          />
  
           <input
            type='text'
            name='idTypePassportOnly'
            placeholder='Enter Your Passport Number'
            value={formData.idTypePassportOnly}
            onChange={handleInputChange}
          />
          <br/>
              <label>Passport Validity</label>
              <input
            type='date'
            name='passportvalidity'
            
            value={formData.passportvalidity}
            onChange={handleInputChange}
          />
<label>Passport Expiry</label>
              <input
            type='date'
            name='passportexpiry'
            value={formData.passportexpiry}
            onChange={handleInputChange}
          />
          <br/>
          <label>D R Validity</label>
          <input
            type='date'
            name='rightToWorkDocumentAppliedDate'
            placeholder='Enter Your Right to work document Applied Date'
            value={formData.rightToWorkDocumentAppliedDate}
            onChange={handleInputChange}
          />
           <label>D R Expiry</label>
          <input
            type='date'
            name='rightToWorkDocumentValidUntil'
            placeholder='Enter Your Right to work document Valid Until'
            value={formData.rightToWorkDocumentValidUntil}
            onChange={handleInputChange}
          />
          <div id='Slect-Dropdown'>
            <select
              name='companyVanOrOwnerVan'
              value={formData.companyVanOrOwnerVan}
              onChange={handleInputChange}
            >
              <option value=''>Select company van / Owner van</option>
              <option value='Company Van'>Company Van</option>
              <option value='Owner van'>Owner van</option>
            </select>
            <select
              name='site'
              value={formData.site}
              onChange={handleInputChange}
            >
              <option value=''>Select Site</option>
              <option value='DP R1 - LeyLand' >DP R1 - LeyLand</option>
              <option value='DXM3 - Rochdale'>DXM3 - Rochdale</option>
              <option value='DXM2 - Manchester'>DXM2 - Manchester</option>
              <option value='DXM5 - Bolton'>DXM5 - Bolton</option>
            </select>
          </div>
          <div className='upload-documents'>
            <h2 className='up-doc'>Upload documents</h2>
            <label htmlFor='image'>Upload Profile Picture</label>
            <br />
            <input
              type='file'
              name='image'
              accept='image/*'
              onChange={handleImageChange}
            />
            {formData.image && (
              <img
                src={formData.image}
                alt='Profile'
                style={{ width: '100px', height: '100px', }}
              />
            )}
            <br />

            <label >Upload Insurance Card</label>
            <br />
            <input
              type='file'
              name='imageinsurancecard'
              accept='image/*'
              onChange={handleImageChange}
            />
            {formData.imageinsurancecard && (
              <img
                src={formData.imageinsurancecard}
                alt='Insurance Card'
                style={{ width: '100px', height: '100px', }}
              />
            )}
            <br />

            <label >Upload Driving Licence</label>
            <br />
            <input
              type='file'
              name='imagedrivinglicence'
              accept='image/*'
              onChange={handleImageChange}
            />
            {formData.imagedrivinglicence && (
              <img
                src={formData.imagedrivinglicence}
                alt='Driving Licence'
                style={{ width: '100px', height: '100px', }}
              />
            )}
            <br />

      

<label > Driving Licence Front Image</label>
<br />
<input
  type='file'
  name='imagedrivinglicencefront'
  accept='image/*'
  onChange={handleImageChange}
/>
{formData.imagedrivinglicencefront && (
  <img
    src={formData.imagedrivinglicencefront}
    alt='Driving Licence Front'
    style={{ width: '100px', height: '100px', }}
  />
)}
<br />

<label > Driving Licence Back Image</label>
<br />
<input
  type='file'
  name='imagedrivinglicenceback'
  accept='image/*'
  onChange={handleImageChange}
/>
{formData.imagedrivinglicenceback && (
  <img
    src={formData.imagedrivinglicenceback}
    alt='Driving Licence Back'
    style={{ width: '100px', height: '100px', }}
  />
)}
<br />



            

            <label>Upload Your Passport</label>
            <br />
            <input
              type='file'
              name='imagepassport'
              accept='image/*'
              onChange={handleImageChange}
            />
            {formData.imagepassport && (
              <img
                src={formData.imagepassport}
                alt='Passport'
                style={{ width: '100px', height: '100px', }}
              />
            )}
            <br />

            <label >Upload Ecs Card</label>
            <br />
            <input
              type='file'
              name='imageecsimage'
              accept='image/*'
              onChange={handleImageChange}
            />
            {formData.imageecsimage && (
              <img
                src={formData.imageecsimage}
                alt='Ecs Card'
                style={{ width: '100px', height: '100px', }}
              />
            )}
            <br />
          </div>

         <br/>
         <label >Upload Other Image</label>
         <br/>
         <input
              type='file'
              name='otherimage'
              accept='image/*'
              onChange={handleImageChange}
            />
          
             {formData.otherimage && (
              <img
                src={formData.otherimage}
                alt='Ecs Card'
                style={{ width: '100px', height: '100px', }}
              />
            )}



<br/>
         <label >Upload Other Image</label>
         <br/>
         <input
              type='file'
              name='otherimage2'
              accept='image/*'
              onChange={handleImageChange}
            />
          
             {formData.otherimage2 && (
              <img
                src={formData.otherimage2}
                alt='Ecs Card'
                style={{ width: '100px', height: '100px', }}
              />
            )}
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
