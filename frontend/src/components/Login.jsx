import { Link } from "react-router-dom";
import Loginhandler from "../utils/loginhandler";
import { useRef, useState } from "react";
function Login() {
  let [errors, setErrors] = useState([]);
  let emailRef = useRef("");
  let passRef = useRef("");
  return (
    <div>
      <ul className="text-red-500">
        {errors &&
          errors.map((err, index) => {
            return <li key={index}>{err}</li>;
          })}
      </ul>
      <div className="text-blue-400">
        <form
          onSubmit={(e) => {
            Loginhandler(e, emailRef, passRef, setErrors);
          }}
        >
          <input
            type="email"
            placeholder="Enter Your Email"
            required
            ref={emailRef}
          />
          <input
            type="password"
            placeholder="password"
            required
            ref={passRef}
          />
          <button type="submit">Login</button>
        </form>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
export default Login;
