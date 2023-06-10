import { initializeApp, getApps, getApp } from 'firebase/app';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  // Ваши конфигурационные данные Firebase
  apiKey: "AIzaSyAwzNA-hPEO81K5EEFf1C1M0bVk4Lk7QBE",
  authDomain: "critika-47ea9.firebaseapp.com",
  projectId: "critika-47ea9",
  storageBucket: "critika-47ea9.appspot.com",
  messagingSenderId: "828314790130",
  appId: "1:828314790130:web:c9ac301632dedcc1db086b",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

const showErrorMessage = (err: unknown) => {
  let message;
  if (err instanceof Error) {
    message = err.message;
  } else {
    message = String(err);
  }
  alert(message);
  console.error(err);
}

const logInWithPopup = async () => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (err) {
    showErrorMessage(err);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    showErrorMessage(err);
  }
};

const registerWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    showErrorMessage(err);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    showErrorMessage(err);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  logInWithPopup,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};