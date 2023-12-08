import React, {  useState, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LanguageContext } from '../contexts/languageContext';
import { getString }  from '../strings.js';
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";


const LoginPage = () => {
  const [user, setUser] = useState();
  const context= useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
      context.authenticate(userName, password);
  };

  let location = useLocation();

  // Set 'from' to path where browser is redirected after a successful login - either / or the protected path user requested
  const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

  if (context.isAuthenticated === true) {
      return <Navigate to={from} />;
  }


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
            <input
              id="username"
              placeholder="Username"
              style={styles.input}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></input>
            <input
              id="password"
              type="password"
              placeholder="Password"
              style={styles.input}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <button style={styles.button} onClick={login}>
              {getString(language, "login")}
            </button>
            <Link to="/signup" style={styles.signupLink}>
              {getString(language, "signUp")}
            </Link>
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
      marginBottom: '0px',
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
  
export default LoginPage;