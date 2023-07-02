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

async function deleteUser() {
  const res = await customFetch(
    `https://api.creativeblogger.org/@me`,
    "DELETE"
  );

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  displaySuccess("Votre compte a été supprimé avec succès");
  setTimeout(() => location.assign("/"), 1000);
}

function verif() {
  let person = prompt("Veuillez entrer votre pseudo pour vérifier", "");

  if (person === infos().username) {
    deleteUser();
  } else {
    displayError("Vous avez annulé la suppression de votre compte");
  }
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
      <h1 class="text-center text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-indigo-500 text-5xl m-5">
        Votre profil :
      </h1>
      <div class="text-center text-teal-500 text-2xl">
        <form
          id="update-infos-form"
          onsubmit={async (e) => {
            e.preventDefault();

            const res = await customFetch(
              "https://api.creativeblogger.org/@me",
              "PUT",
              new FormData(
                document.getElementById("update-infos-form") as HTMLFormElement
              ),
              false
            );

            if (!res.ok) {
              displayError(getError(await res.json()));
              return;
            }

            getInfos();
            displaySuccess("Informations mises jour avec succès !");
          }}
        >
          <label class="text-3xl text-black" for="username">
            Nom d'utilisateur :
          </label>
          <input
            type="text"
            class="p-2 rounded-md border m-5"
            name="username"
            id="username"
            value={infos().username}
            autocomplete="off"
            required
          />
          <br />
          <label class="text-3xl text-black" for="email">
            Adresse email :
          </label>
          <input
            type="email"
            class="p-2 rounded-md border m-5"
            name="email"
            id="email"
            value={infos().email}
            autocomplete="off"
            required
          />
          <br />
          <label class="text-3xl text-black" for="password">
            Changer le mot de passe :
          </label>
          <input
            type="password"
            class="p-2 rounded-md border m-5"
            name="password"
            id="password"
            autocomplete="off"
            required
          />
          <br />
          <label class="text-3xl text-black">Permissions :</label>
          <h2 class="p-4">{findPermissions(infos().permission)}</h2>
          <label class="text-3xl text-black">Créé le :</label>
          <h2 class="p-4">{getHumanDate(infos().created_at)}</h2>
          <Show when={infos().created_at !== infos().created_at}>
            <label class="text-3xl text-black">Modifier le :</label>
            <h2 class="p-4">{getHumanDate(infos().update_at)}</h2>
          </Show>
          <button
            class="flex mx-auto mb-4 w-1/3 duration-200 hover:rounded-2xl justify-center rounded-md shadow-indigo-500/50 bg-gradient-to-l from-indigo-500 to-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            Mettre à jour
          </button>
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
        <Show when={infos().permission === 3}>
          <NavLink
            class="duration-150 hover:text-indigo-500 hover:underline"
            href="/admin"
          >
            Pannel Admin
          </NavLink>
        </Show>
        <br />
        <br />
        <button
          onclick={verif}
          class="mx-auto w-1/4 bg-red-500 text-white p-2 rounded-md"
        >
          Supprimer mon compte
        </button>
      </div>
    </MetaProvider>
  );
};

export default MePage;
