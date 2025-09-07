import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import registerhandler from "../utils/Registerhandler";
import { useState } from "react";
function Register() {
  let [errors, setErrors] = useState([]);
  let nameRef = useRef("");
  let emailRef = useRef("");
  let passRef = useRef("");
  let navigate = useNavigate();
  return (
    <div>
      <ul>
        {errors &&
          errors.map((error, index) => {
            return (
              <li key={index} className="text-red-500">
                {error}
              </li>
            );
          })}
      </ul>
      <div className="text-blue-400">
        <form
          onSubmit={(e) => {
            registerhandler(e, nameRef, emailRef, passRef, setErrors, navigate);
          }}
        >
          <input
            type="text"
            placeholder="Enter Your Name"
            required
            ref={nameRef}
          />
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
          <button type="submit">Register</button>
        </form>
        <Link to="/login">login</Link>
      </div>
    </div>
  );
}
export default Register;
