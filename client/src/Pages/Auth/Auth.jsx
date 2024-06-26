import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import './Auth.css'
import icon from '../../assets/icon.svg'
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";

const Auth = () => {

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("Enter email and password");
    }
    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
      }
      dispatch(signup({ name, email, password }, navigate));
    } else {
      dispatch(login({ email, password }, navigate));
    }
  };


  return (
    <section className="auth-section">
      { isSignup && <AboutAuth />}
      <div className="auth-container-2">
        { !isSignup && <img src={icon} alt='Stack-overflow' className="login-logo"/>}
        <form onSubmit={handleSubmit}>
          {
            isSignup && (
              <label htmlFor="name">
                <h4>Display Name</h4>
                <input type="text" id="name" name="name" onChange={(e) => {setName(e.target.value)}}/>
              </label>
            )
          }
          <label htmlFor="email">
            <h4>Email</h4>
            <input type="email" name="email" id="email" onChange={(e) => {setEmail(e.target.value)}}/>
          </label>
          <label htmlFor="password" >
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h4>Password</h4>
              { !isSignup && <p style={{color:'#007ac6', fontSize:'13px'}}>forgot password?</p>}
            </div>            
            <input type="password" name="password" id="password" onChange={(e) => {setPassword(e.target.value)}}/>
            { isSignup && <p style={{color:'#eff7fe', fontSize:'13px'}}>Password must contain at least eight<br />characters, including at least 1 letter and 1<br />number.</p>}
          </label>
          {
            isSignup && (
              <label htmlFor="check" style={{display: 'flex', justifyContent:'space-around'}}>
                <input type="checkbox" id="check" style={{width:'18px'}}/>
                <p style={{fontSize:'13px', color: '#eff7fe'}}>Opt-in to receive occasional<br />product updates, user research invitations,<br />company announcements, and digests.</p>
              </label>
            )
          }
          <button type="submit" className="auth-btn">{ isSignup ? 'Sign up' : 'Log in'}</button>
          {
            isSignup && (
              <p style={{color:'#eff7fe', fontSize:'13px'}}>
                By clicking "Sign up", you agree to our
                <span style={{color:'#eff7fe'}}> terms of<br />service</span>, 
                <span style={{color:'#eff7fe'}}> privacy policy</span> and 
                <span style={{color:'#eff7fe'}}> cookie policy</span>
              </p>
            )
          }
        </form>
        <p style={{color:'#eff7fe'}}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button type="button" className="handle-switch-btn" onClick={handleSwitch}>{isSignup ? 'Log in' : 'Sign up'}</button>
        </p>
      </div>
    </section>
  )
}

export default Auth