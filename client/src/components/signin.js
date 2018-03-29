import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => (
  <div>
    <h1>Bangarang Bingo</h1>
    <div className="signin">
      Sign In here
    </div>
    <div>If you do not already have an account, <Link to="/SignUp">Sign Up</Link>!</div>

    <Link to="/">LANDING PAGE</Link>
  </div>
);

export default SignIn;
