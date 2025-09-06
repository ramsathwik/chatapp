import Loginapi from "../services/loginapi";
function Loginhandler(e, emailRef, passRef) {
  e.preventDefault();
  let email = emailRef.current.value;
  let password = passRef.current.value;
  Loginapi(email, password);
  emailRef.current.value = "";
  passRef.current.value = "";
}
export default Loginhandler;
