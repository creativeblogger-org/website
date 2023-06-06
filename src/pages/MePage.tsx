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
import { displaySuccess } from "../utils/functions_utils";
import { getInfos, infos } from "../components/NavBar";

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
      <h1 class="text-center text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-indigo-500 text-5xl m-5">
        Votre profile :
      </h1>
      <div class="text-center text-teal-500 text-2xl">
        <form id="update-infos-form" onsubmit={async e => {
          e.preventDefault();

          const res = await customFetch("https://api.creativeblogger.org/@me", "PUT", new FormData(document.getElementById("update-infos-form") as HTMLFormElement), false);

          if (!res.ok) {
            displayError(getError(await res.json()))
            return
          }

          getInfos()
          displaySuccess("Informations mises jour avec succès !")
        }}>
            <label class="text-3xl text-black" for="username">
              Nom d'utilisateur : 
            </label>
            <input type="text" class="p-2 mb-2" name="username"  id="username" value={infos().username} required /><br />
            <label class="text-3xl text-black" for="email">
              Adresse email : 
            </label>
            <input type="email" class="p-2 mb-2" name="email" id="email" value={infos().email} required /><br />
            <label class="text-3xl text-black">
              Permissions : 
            </label>
            <h2 class="p-4">
              {findPermissions(infos().permission)}
            </h2>
            <label class="text-3xl text-black">
              Créé le :
            </label>
            <h2 class="p-4">
              {getHumanDate(infos().created_at)}
            </h2>
            <Show when={infos().created_at !== infos().update_at}>
              <label class="text-3xl text-black">
                Modifier le :
              </label>
              <h2 class="p-4">
                {getHumanDate(infos().update_at)}
              </h2>
            </Show>

            <input type="submit" class="bg-teal-500 text-white p-2 rounded-xl mb-2 hover:cursor-pointer">Mettre à jour</input>
        </form>

        <hr class="p-2" />
        <Show when={infos().permission >= 1}>
          <NavLink
            class="duration-150 hover:text-indigo-500 hover:underline"
            href="/create"
          >
            Créer un article
          </NavLink>
        </Show>
        <hr class="m-2 p-2" />
        <Show when={infos().permission === 2}>
          <NavLink
            class="duration-150 hover:text-indigo-500 hover:underline"
            href="/admin"
          >
            Pannel Admin
          </NavLink>
        </Show>
      </div>
    </MetaProvider>
  );
};

export default MePage;
