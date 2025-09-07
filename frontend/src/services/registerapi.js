import { API_URL } from "../config/apiconfix";
async function Registerapi(name, email, password) {
  console.log("from register");
  let response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) {
    let data = await response.json();
    throw new Error(data.errors);
  } else {
    let data = await response.json();
    console.log(data);
  }
}
export default Registerapi;
