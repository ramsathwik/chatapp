import { Link } from "react-router-dom";
import { useRef } from "react";
import registerhandler from "../utils/Registerhandler";
function Register() {
  let nameRef = useRef("");
  let emailRef = useRef("");
  let passRef = useRef("");
  return (
    <div className="text-blue-400">
      <form
        onSubmit={(e) => {
          registerhandler(e, nameRef, emailRef, passRef);
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
        <input type="password" placeholder="password" required ref={passRef} />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">login</Link>
    </div>
  );
}
export default Register;
