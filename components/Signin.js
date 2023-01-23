/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <img alt="logo" src="/Quidditch.png" />
      <h1>Welcome to Quidditch Keeper!</h1>
      <h4>Click the button below to get started!</h4>
      <Button type="button" size="lg" className="copy-btn btn-sign-in" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
