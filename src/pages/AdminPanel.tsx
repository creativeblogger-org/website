import { Component } from "solid-js";
import { customFetch, getError } from "../utils/functions_utils";

async function deleteUser() {
  let pseudo = (document.getElementById("username") as HTMLInputElement).value;
      
  if (!pseudo || pseudo.length == 0) {
    return
  }

  const res = await customFetch(`https://api.creativeblogger.org/users/${pseudo}`, "DELETE")

  if (!res.ok) {
    alert(getError(await res.json()))
  }

  console.log(res);
  
}

const AdminPanel: Component<{}> = () => {
  return <div>
    <h1 class="text-xl font-bold">Delete user</h1>
    <form onsubmit={e => {
      e.preventDefault()

      deleteUser()
      
    }}>
      <input type="text" name="username" id="username" /><br />
      <input type="submit" value="Supprimer le compte (irréversible)" />
    </form>
  </div>;
};

export default AdminPanel;