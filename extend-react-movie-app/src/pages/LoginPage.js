import React, {  useState, useContext, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import  firebaseConfig, { auth } from "../firebaseConfig";
import { Navigate } from "react-router-dom";
import { LanguageContext } from '../contexts/languageContext';
import { getString }  from '../strings.js';

initializeApp(firebaseConfig);

const LoginPage = () => {
  const [user, setUser] = useState();

    const handleLogin = async () => {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
      hd: "mail.wit.ie",
    });

    try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error("Error signing in with Google:", error);
      }
    };


    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    });
  
    const { language } = useContext(LanguageContext);
  
    return (
      <>
        {user ? (
          <Navigate to={`/`} />
        ) : (
          <>
            <div style={styles.container}>
              <img
                  src="http://devops.witdemo.net/logo.jpg"
                  alt="Logo"
                  style={styles.logo}
              />
              <h1 style={styles.heading}>{getString(language, "loginPage")}</h1>
              <button style={styles.button} onClick={handleLogin}>
                Login with @mail.wit.ie Google Account
              </button>
            </div>
          </>
        )}
      </>
    );
  };
  
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '70vh',
      fontFamily: 'Arial, sans-serif'
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '20px',
      color: '#1e364d',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1rem',
      backgroundColor: '#4caf50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    logo: {
      width: '370px', 
      height: '204px', 
      marginBottom: '20px',
    },
  };
  
export default LoginPage;