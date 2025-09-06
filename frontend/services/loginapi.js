import { API_URL } from "../config/apiconfix";
async function Loginapi(email, password) {
  let response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  try {
    let data = await response.json();
  } catch (err) {
    console.log("some error occur");
  }
}
export default Loginapi;
