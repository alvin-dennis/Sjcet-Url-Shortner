import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div>
      <div className="background">
        <div className="galaxy-light"></div>
        <div className="bottom-left-light"></div>
        <div className="glow-circle" style={{top: "8%", left: "18%", width: "120px", height: "120px"}}></div>
        <div className="glow-circle" style={{top: "60%", left: "80%", width: "80px", height: "80px"}}></div>
        <div className="glow-circle" style={{top: "85%", left: "10%", width: "60px", height: "60px"}}></div>
        <div className="glow-circle" style={{top: "20%", left: "70%", width: "60px", height: "60px"}}></div>
        <div className="star" style={{top: "12%", left: "60%"}}></div>
        <div className="star" style={{top: "30%", left: "80%"}}></div>
        <div className="star" style={{top: "80%", left: "90%"}}></div>
        <div className="star" style={{top: "70%", left: "20%"}}></div>
        <div className="star" style={{top: "50%", left: "50%"}}></div>
        <div className="grid-square" style={{top: "8%", left: "70%", width: "60px", height: "60px"}}></div>
        <div className="grid-square" style={{top: "60%", left: "20%", width: "48px", height: "48px"}}></div>
        <div className="grid-square" style={{top: "20%", left: "85%", width: "40px", height: "40px"}}></div>
      </div>
      <div className="header">
        <div className="logo">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/link.png" alt="logo" className="logo-icon" />
          <span className="logo-text">ShortX</span>
        </div>
      </div>
      <div className="top-right-text">
        Official Link-Shortening Tool For SJCET<span className="bolt">⚡</span>
      </div>
      <div className="login-container">
        <form className="login-form">
          <h2>Login to your account</h2>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="taskmail@gmail.com" required />
          <div className="password-row">
            <label htmlFor="password">Password</label>
            <a href="#" className="forgot">Forgot ?</a>
          </div>
          <input type="password" id="password" placeholder="Enter your password" required />
          <button type="submit">Login now</button>
          <div className="signup-link">
            Don't Have An Account? <a href="#">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
