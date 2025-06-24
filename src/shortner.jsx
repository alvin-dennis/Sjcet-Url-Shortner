import React, { useState } from "react";
import "../App.css";

function Shortener() {
  const [inputUrl, setInputUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleShorten = () => {
    if (!inputUrl) return alert("Please enter a URL");
    const fakeCode = Math.random().toString(36).substring(2, 7);
    setShortenedUrl(`https://sjcet.link/${fakeCode}`);
  };

  return (
    <div className="app">
      <div className="background" />

      <header className="navbar">
        <div className="logo">ShortX</div>
        <nav className="nav-links">
          <a href="#" className="active">Home</a>
        </nav>
        <div className="auth-buttons">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign up</button>
        </div>
      </header>

      <main className="hero">
        <div className="badge">Official Link-Shortening Tool For SJCET⚡</div>
        <h1>ShortX - SJCET</h1>
        <p className="tagline">Transform lengthy URLs into elegant, official short links.</p>
        <p className="description">Your trusted institutional URL shortener.</p>

        <div className="shortener-box">
          <input
            type="text"
            placeholder="Enter your long URL here"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
          <button onClick={handleShorten}>Shorten</button>
        </div>

        {shortenedUrl && (
          <div className="result">
            <p>Shortened URL:</p>
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
              {shortenedUrl}
            </a>
          </div>
        )}
      </main>
    </div>
  );
}

export default Shortener;
