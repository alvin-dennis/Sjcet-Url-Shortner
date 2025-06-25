import React from 'react';
import styles from './landing.module.css';

const Landing = () => {
  return (
    <div className={styles.container}>
      <header className={styles.navbar}>
        <div className={styles.logo}>Short<span className={styles.accent}>X</span></div>
        <div className={styles.navButtons}>
          <button className={styles.login}>Login</button>
          <button className={styles.signup}>Sign up</button>
        </div>
      </header>

      <div className={styles.centerContent}>
        <div className={styles.badge}>Official Link-Shortening Tool For SJCET⚡</div>
        <h1 className={styles.title}>ShortX-SJCET</h1>
        <p className={styles.tagline}>
          Transform lengthy URLs into elegant, official short links.
        </p>
        <p className={styles.subtext}>Your trusted institutional URL shortener.</p>
      </div>
    </div>
  );
};

export default Landing;
