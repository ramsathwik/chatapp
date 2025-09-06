import { Link } from "react-router-dom";
import Loginhandler from "../utils/loginhandler";
import { useRef } from "react";
function Login() {
  let emailRef = useRef("");
  let passRef = useRef("");
  return (
    <div className="text-blue-400">
      <form
        onSubmit={(e) => {
          Loginhandler(e, emailRef, passRef);
        }}
      >
        <input
          type="email"
          placeholder="Enter Your Email"
          required
          ref={emailRef}
        />
        <input type="password" placeholder="password" required ref={passRef} />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
}
export default Login;
