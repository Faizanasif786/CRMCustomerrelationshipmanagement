import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


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
const auth = getAuth(app);

export default function OnSiteSignin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please fill in both email and password.');
      return;
    }
    try {
      // Sign in the user with email and password using Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      // If sign-in is successful, navigate to the "/rota" route
      alert('Login Success')
      navigate('/AddToFleet');
    } catch (error) {
      // If sign-in fails, display the error message to the user
      setError(error.message);
    }
  };

  return (
    <>
      <div id="Top-Div"></div>
      <div id="AdminLoginForm">
        <form>
          <h2>Sign In</h2>

          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /> <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /> <br />
          <button id='SignBtn' type="button" onClick={handleSignIn}>
            Sign in
          </button>

          {/* Display error message if sign-in fails */}
          {error && <p style={{ color: 'red' }}>Incorrect Email Or Password</p>}
        </form>
      </div>
    </>
  );
}
