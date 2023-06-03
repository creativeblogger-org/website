import { Component, Show, createSignal, onMount } from "solid-js";
import {
  customFetch,
  displayError,
  findPermissions,
  getError,
  getHumanDate,
} from "../utils/functions_utils";
import { MetaProvider, Title } from "@solidjs/meta";
import { NavLink } from "@solidjs/router";

const [infos, setInfos] = createSignal({} as User);

async function getInfos() {
  const res = await customFetch(`https://api.creativeblogger.org/@me/`, "GET");

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  setInfos(await res.json());
}

const MePage: Component = () => {
  onMount(() => {
    getInfos();
  });

  function isWriter() {
    if (infos().permission === 2) {
      return true;
    }
  }
  return (
    <MetaProvider>
      <div class="Home">
        <Title>Creative Blogger - {infos().username}</Title>
      </div>
      <div>
        <h1 class="text-center text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-indigo-500 text-5xl m-5">
          Votre profile :
        </h1>
        <div class="text-center">
          <label class="text-3xl" for="name">
            Nom d'utilisateur :
          </label>
          <h2 class="p-4 text-2xl text-teal-500">{infos().username}</h2>
          <label class="text-3xl" for="email">
            Adresse email :
          </label>
          <h2 class="p-4 text-2xl text-teal-500">{infos().email}</h2>
          <label class="text-3xl" for="id">
            ID d'utilisateur :
          </label>
          <h2 class="p-4 text-2xl text-teal-500">{infos().id}</h2>
          <label class="text-3xl" for="perms">
            Permissions :
          </label>
          <h2 class="p-4 text-2xl text-teal-500">
            {findPermissions(infos().permission)}
          </h2>
          <label class="text-3xl" for="create">
            Créé le :
          </label>
          <h2 class="p-4 text-2xl text-teal-500">
            {getHumanDate(infos().created_at)}
          </h2>
          <label class="text-3xl" for="update">
            Modifier le :
          </label>
          <h2 class="p-4 text-2xl text-teal-500">
            {getHumanDate(infos().update_at)}
          </h2>
          <hr class="p-2" />
          <Show when={infos().permission === 1 || 2}>
            <NavLink
              class="text-2xl text-teal-500 duration-150 hover:text-indigo-500 hover:underline"
              href="/create"
            >
              Créer un article
            </NavLink>
          </Show>
          <hr class="m-2 p-2" />
          <Show when={infos().permission === 2}>
            <NavLink
              class="text-2xl text-teal-500 duration-150 hover:text-indigo-500 hover:underline"
              href="/admin"
            >
              Pannel Admin
            </NavLink>
          </Show>
        </div>
      </div>
    </MetaProvider>
  );
};

export default MePage;
