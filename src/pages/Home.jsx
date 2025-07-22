// src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <nav>
        <Link to="/login">Login</Link> | 
        <Link to="/register">Register</Link>
      </nav>
    </div>
  );
}