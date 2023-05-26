/**
 * To find your Firebase config object:
 * 
 * 1. Go to your [Project settings in the Firebase console](https://console.firebase.google.com/project/_/settings/general/)
 * 2. In the "Your apps" card, select the nickname of the app for which you need a config object.
 * 3. Select Config from the Firebase SDK snippet pane.
 * 4. Copy the config object snippet, then add it here.
 */
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF2QNve9j5SjzI1GS5qFbbUb6pl1Gmx3A",
  authDomain: "phototaggingapp-ffbdf.firebaseapp.com",
  projectId: "phototaggingapp-ffbdf",
  storageBucket: "phototaggingapp-ffbdf.appspot.com",
  messagingSenderId: "330950888254",
  appId: "1:330950888254:web:99c4ae992038c7f92d3a6f"
};

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return firebaseConfig;
  }
}