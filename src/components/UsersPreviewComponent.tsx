import {
  customFetch,
  displayError,
  findPermissions,
  getError,
} from "../utils/functions_utils";
import { fetch_users } from "../pages/PanelPage";

const UsersPreviewComponent = (props: { user: User }) => {
  async function delete_user() {
    const res = await customFetch(
      `https://api.creativeblogger.org/users/${props.user.username}`,
      "DELETE"
    );

    if (!res.ok) {
      displayError(getError(await res.json()));
      return;
    }

    alert("Utilisateur supprimé avec succès !");
    fetch_users();
  }

  return (
    <div class="rounded-lg p-4 m-5 border w-auto duration-150 hover:border-indigo-500">
      <h1 class="text-3xl font-bold text-center duration-150 hover:text-indigo-500">
        {props.user.username}
      </h1>
      <h2 class="text-center">ID de l'utilisateur : {props.user.id}</h2>
      <h3 class="text-center">
        Permission de l'utilisateur : {findPermissions(props.user.permission)}
      </h3>
      <button onclick={delete_user}>Delete</button>
    </div>
  );
};

export default UsersPreviewComponent;
