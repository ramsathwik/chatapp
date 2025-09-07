import Loginapi from "../services/loginapi";
async function Loginhandler(e, emailRef, passRef, setErrors) {
  e.preventDefault();
  let email = emailRef.current.value;
  let password = passRef.current.value;
  try {
    let data = await Loginapi(email, password);
    console.log(data);
    setErrors("");
  } catch (err) {
    setErrors(err.errors.map((err) => err.msg));
  }
  emailRef.current.value = "";
  passRef.current.value = "";
}
export default Loginhandler;
