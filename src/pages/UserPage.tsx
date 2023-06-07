import { Component, createSignal, onMount } from "solid-js";
import {
  customFetch,
  displayError,
  findPermissions,
  getError,
  getHumanDate,
} from "../utils/functions_utils";
import { MetaProvider, Title } from "@solidjs/meta";

const [user, setUser] = createSignal({} as User);

async function getUser() {
  const res = await customFetch(
    `https://api.creativeblogger.org${location.pathname}`
  );

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  const user: User = await res.json();
  console.log(user);

  setUser(user);
}

const UserPage: Component = () => {
  onMount(() => getUser());

  return (
    <MetaProvider>
      <div class="Home">
        <Title>Creative Blogger - {user().username}</Title>
      </div>
      <div class="text-center">
        <h1 class="text-5xl m-7 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-500 ">
          Fiche d'identité d'utilisateur :{" "}
        </h1>
        <h2 class="text-3xl m-7">
          Nom d'utilisateur :{" "}
          <strong class="text-teal-500">{user().username}</strong>
        </h2>
        <h2 class="text-3xl m-7">
          Rôle :{" "}
          <strong class="text-teal-500">
            {findPermissions(user().permission)}
          </strong>
        </h2>
        <h2 class="text-3xl m-7">
          Créé le{" "}
          <strong class="text-teal-500">
            {getHumanDate(user().created_at)}
          </strong>
        </h2>
      </div>
    </MetaProvider>
  );
};

export default UserPage;
