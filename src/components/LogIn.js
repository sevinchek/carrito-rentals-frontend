import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/app/app';
import Alert from './modules/Alert';
import splash from '../images/assets/carrito-splash.png';

const LogIn = () => {
  const alert = useSelector((state) => state.alertReducer);
  const dispatch = useDispatch();
  const [signUpOpen, setSignUpWindow] = useState(false);
  const [username, setUsername] = useState('');
  const [newusername, setNewUsername] = useState('');
  const usernameValidator = () => {
    let validation = true;
    if (username.length < 1) {
      validation = false;
      dispatch(actions.displayAlert('Field cannot be blank'));
    }
    if (validation) {
      return true;
    }
    return false;
  };
  const newUsernameValidator = () => {
    let validation = true;
    if (newusername.length < 6) {
      validation = false;
      dispatch(actions.displayAlert('Username must be 6 characters minimum'));
    }
    if (validation) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    if (!signUpOpen) {
      if (usernameValidator()) {
        dispatch(actions.logIn(username));
      }
    } else {
      dispatch(actions.displayAlert('Welcome back! Please login to continue'));
      const loginField = document.getElementById('login_field');
      loginField.className = 'align-self-center';
      setSignUpWindow(false);
    }
  };
  const openSignUpPopUp = () => {
    if (signUpOpen) {
      if (newUsernameValidator()) {
        dispatch(actions.signUp(newusername));
      }
    } else {
      dispatch(actions.displayAlert('Create a new username'));
      const loginField = document.getElementById('login_field');
      loginField.className = `${loginField.className} d-none`;
      setSignUpWindow(true);
    }
  };
  return (
    <div className="vh-100 text-center bg-warning d-flex flex-column justify-content-center">
      <div>
        <img
          src={splash}
          id="slide"
          className="carrito-splash-pic"
          alt="Carrito Logo"
        />
      </div>
      <div id="login_field" className="align-self-center">
        {alert ? <Alert message={alert} /> : false }
        <div className="input-group mb-5 username">
          <span className="input-group-text">@</span>
          <input type="text" id="loginInput" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="form-control" />
        </div>
      </div>
      {signUpOpen ? (
        <div className="align-self-center">
          {alert ? <Alert message={alert} /> : false }
          <div className="input-group mb-5 align-self-center username">
            <span className="input-group-text">New</span>
            <input type="text" placeholder="Username" onChange={(e) => setNewUsername(e.target.value)} className="form-control" />
          </div>
        </div>
      ) : false}
      <div className="input-group mb-5 align-self-center username text-center justify-content-center">
        <button type="button" id="loginBtn" onClick={() => { handleSubmit(); }} className="btn btn-dark btn-sm mx-1">Log in</button>
        <button type="button" onClick={() => { openSignUpPopUp(); }} className="btn btn-dark btn-sm mx-1">Sign Up</button>
      </div>
    </div>
  );
};

export default LogIn;
