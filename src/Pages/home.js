import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-4">
        Hola Mundo 2
      </div>
      <span>
        <Link to="/">Login</Link>
      </span>
    </div>
  </div>
)

export default Home;