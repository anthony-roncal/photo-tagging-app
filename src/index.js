import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase-config.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF2QNve9j5SjzI1GS5qFbbUb6pl1Gmx3A",
  authDomain: "phototaggingapp-ffbdf.firebaseapp.com",
  projectId: "phototaggingapp-ffbdf",
  storageBucket: "phototaggingapp-ffbdf.appspot.com",
  messagingSenderId: "330950888254",
  appId: "1:330950888254:web:99c4ae992038c7f92d3a6f"
};

// Initialize Firebase
const firebaseAppConfig = getFirebaseConfig();
const app = initializeApp(firebaseAppConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
