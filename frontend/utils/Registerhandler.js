import Registerapi from "../services/registerapi";
function registerhandler(e, nameRef, emailRef, passRef) {
  e.preventDefault();
  let name = nameRef.current.value;
  let email = emailRef.current.value;
  let password = passRef.current.value;
  Registerapi(name, email, password);
  nameRef.current.value = "";
  emailRef.current.value = "";
  passRef.current.value = "";
}
export default registerhandler;
