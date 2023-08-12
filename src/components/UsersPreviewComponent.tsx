import {
  customFetch,
  displayError,
  displaySuccess,
  findPermissions,
  getError,
} from "../utils/functions_utils";
import { fetch_users } from "../pages/PanelPage";
import { Show } from "solid-js";

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

    displaySuccess("Utilisateur supprimé avec succès !");
    fetch_users();
  }

  async function become_writer() {
    const res = await customFetch(
      `https://api.creativeblogger.org/users/upgrade/${props.user.username}`,
      "PUT",
      JSON.stringify({
        permission: 1,
      })
    );
    if (!res.ok) {
      displayError(getError(await res.json()));
      return;
    }

    displaySuccess("L'utilisateur est bel et bien devenu rédacteur !");
    fetch_users();
  }

  async function become_mods() {
    const res = await customFetch(
      `https://api.creativeblogger.org/users/upgrade/${props.user.username}`,
      "PUT",
      JSON.stringify({
        permission: 2,
      })
    );
    if (!res.ok) {
      displayError(getError(await res.json()));
      return;
    }

    displaySuccess("L'utilisateur est bel et bien devenu modérateur !");
    fetch_users();
  }

  async function become_member() {
    const res = await customFetch(
      `https://api.creativeblogger.org/users/upgrade/${props.user.username}`,
      "PUT",
      JSON.stringify({
        permission: 0,
      })
    );
    if (!res.ok) {
      displayError(getError(await res.json()));
      return;
    }

    displaySuccess("L'utilisateur est bel et bien devenu membre !");
    fetch_users();
  }

  return (
    <div class="rounded-lg p-4 m-5 border w-auto duration-150 hover:border-indigo-500">
      <a
        href={"/users/" + props.user.username}
        class="text-black dark:text-white"
      >
        <h1 class="text-3xl font-bold text-center duration-150 hover:text-indigo-500">
          <img src={props.user.pp} alt="" class="h-10" />
          {props.user.username}
        </h1>{" "}
      </a>

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
      <Show when={props.user.permission < 3}>
        <div>
          <h1 class="text-center">Faire devenir :</h1>
          <div class="grid grid-cols-1">
            <Show when={props.user.permission !== 0}>
              <button
                class="bg-blue-500 p-2 m-3 rounded-md"
                onclick={become_member}
              >
                Membre
              </button>
            </Show>
            <Show when={props.user.permission !== 1}>
              <button
                class="bg-green-500 p-2 m-3 rounded-md"
                onclick={become_writer}
              >
                Rédacteur
              </button>
            </Show>
            <Show when={props.user.permission !== 2}>
              <button
                class="bg-orange-500 p-2 m-3 rounded-md text-xs lg:text-base"
                onclick={become_mods}
              >
                Mods
              </button>
            </Show>
          </div>
        </div>
      </Show>
      <Show when={props.user.permission === 3}>
        <div class="bg-black p-2 m-3 rounded-md text-xs lg:text-base text-center text-white">
          Administrateur
        </div>
      </Show>
    </div>
  );
};

export default UsersPreviewComponent;
