import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => (
  <div>
    <h1>Bangarang Bingo</h1>
    <div className="signin">
      Sign Up here
    </div>
    <div>If you already have an account, <Link to="/SignIn">Sign In</Link>!</div>

    <Link to="/">LANDING PAGE</Link>
  </div>
);

export default SignUp;
