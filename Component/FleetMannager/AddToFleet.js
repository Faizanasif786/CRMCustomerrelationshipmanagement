import React, { useState } from 'react';
import FleetModuleHeader from './FleetModuleHeader'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
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
    suppliername: '',
    make: '',
    model: '',
    vinno: '',
    color: '', // Corrected field name to 'color'
    regplate: '',
    transmission: '',
    serviceshistories: '',
    damagehistories: '',
    ActiveInactive: '',
    fleetdrop: '',
    otherImage: '',
    otherimage2: '',
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
      const fieldName = e.target.name;
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
    const requiredFields = [
      'suppliername',
      'make',
      'model',
      'vinno',
      'color',
      'regplate',
      'transmission',
      'serviceshistories',
      'damagehistories',
      'ActiveInactive',
      'fleetdrop',
    ];

    const isAnyFieldBlank = requiredFields.some((field) => !formData[field]);

    if (isAnyFieldBlank) {
      alert('Please fill all the given fields.');
    } else {
      alert('Thanks for your submission!');
      console.log('Form Data:', formData);
      push(ref(database, 'addtofleet'), {
        ...formData,
        otherImage: formData.otherImage.toString(),
        otherimage2: formData.otherimage2.toString(),
      });

      setFormData({
        suppliername: '',
        make: '',
        model: '',
        vinno: '',
        color: '',
        regplate: '',
        transmission: '',
        serviceshistories: '',
        damagehistories: '',
        ActiveInactive: '',
        fleetdrop: '',
        otherImage: '',
        otherimage2: '',
      });
    }
  };

  return (
    <>
      <FleetModuleHeader />
      <div className='driver-registration-heading'>
        <h1>Fleet Registration Form</h1>
      </div>
      <div id='profile-Form'>
        <form>
       <input
            type='text'
            name='suppliername'
            placeholder='Enter Your supplier name'
            value={formData.suppliername}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='make'
            placeholder='Enter Your make'
            value={formData.make}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='model'
            placeholder='Enter Your model'
            value={formData.model}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='vinno'
            placeholder='Enter Your National Insurance Number'
            value={formData.vinno}
            onChange={handleInputChange}
          />
             <input
            type='text'
            name='color'
            placeholder='Enter Your Color'
            value={formData.color}
            onChange={handleInputChange}
          />
       <input
            type='text'
            name='regplate'
            placeholder='Enter Your regplate'
            value={formData.regplate}
            onChange={handleInputChange}
          />
             <input
            type='text'
            name='transmission'
            placeholder='Enter Your transmission'
            value={formData.transmission}
            onChange={handleInputChange}
          />
                 <input
            type='text'
            name='serviceshistories'
            placeholder='Enter Your serviceshistories'
            value={formData.serviceshistories}
            onChange={handleInputChange}
          />
          
          <input
            type='text'
            name='damagehistories'
            placeholder='Enter Your damagehistories'
            value={formData.damagehistories}
            onChange={handleInputChange}
          />
          
          <br/><br/>
          <div id='Slect-Dropdown'>
            <select
              name='ActiveInactive'
              value={formData.ActiveInactive}
              onChange={handleInputChange}
            >
              <option value=''>Select Active / InActive</option>
              <option value='Active'>Active</option>
              <option value='In Active'>InActive</option>
            </select>
            <select
              name='fleetdrop'
              value={formData.fleetdrop}
              onChange={handleInputChange}
            >
              <option value=''>Select fleetdrop</option>
              <option value='Public Liability' >Public Liability</option>
              <option value='Road Tax'>Road Tax</option>
              <option value='DXM2 - Manchester'>DXM2 - Manchester</option>
              <option value='MOT'>MOT</option>
            </select>
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
