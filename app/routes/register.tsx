import { Link } from "@remix-run/react";

export default function Register() {
  return (
    <div>
      <h1>Register form</h1>

      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
}
