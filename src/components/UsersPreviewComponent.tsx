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

  async function become_writer() {
    const res = await customFetch(
      `https://api.creativeblogger.org/users/${props.user.username}/1`,
      "PUT"
    );
    if (!res.ok) {
      displayError(getError(await res.json()));
      return;
    }

    alert("L'utilisateur est bel et bien devenu rédacteur !");
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
      <div class="flex justify-center">
        {/* <button class="bg-green-500 p-2 m-3 rounded-md" onclick={become_writer}>
          Writer
        </button> */}
        <button class="bg-red-500 p-2 m-3 rounded-md" onclick={delete_user}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default UsersPreviewComponent;
