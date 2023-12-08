import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { getString }  from '../strings.js';
import { LanguageContext } from '../contexts/languageContext';

const SignUpPage = props => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const { language } = useContext(LanguageContext);

  const register = () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (validPassword && password === passwordAgain) {
      context.register(userName, password);
      setRegistered(true);
    }
  }

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <>
    
    <div style={styles.container}>
      <h2 style={styles.heading}>{getString(language, "signUpPage")}</h2>
      <p>{getString (language, "signUpPageDesc")}</p>
      <input value={userName} placeholder="user name" style={styles.input} onChange={e => {
        setUserName(e.target.value);
      }}></input><br />
      <input value={password} type="password" placeholder="password" style={styles.input} onChange={e => {
        setPassword(e.target.value);
      }}></input><br />
      <input value={passwordAgain} type="password" placeholder="password again" style={styles.input} onChange={e => {
        setPasswordAgain(e.target.value);
      }}></input><br />
      {/* Login web form  */}
      <button style={styles.button} onClick={register}>{getString(language, "signUp")}</button>
    </div>
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
    marginBottom: '0px',
    color: '#1e364d',
  },
  input: {
    width: '300px',
    padding: '10px',
    margin: '8px 0',
    boxSizing: 'border-box',
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
  signupLink: {
    marginTop: '10px',
    textDecoration: 'none',
    color: '#4caf50',
    cursor: 'pointer',
    fontSize: '1rem',
    marginBottom: '20px',
  },
};

export default SignUpPage;