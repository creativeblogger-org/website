import { Component, For, createSignal, onMount } from "solid-js";
import PostPreviewComponent from "../components/PostPreviewComponent";
import UsersPreviewComponent from "../components/UsersPreviewComponent";
import { NavLink } from "@solidjs/router";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { customFetch, displayError, getError } from "../utils/functions_utils";
import { fetch_posts } from "./Home";
import { API_URL } from "../App";

const [posts, setPosts] = createSignal([] as Post[]);
const [users, setUsers] = createSignal([] as User[]);
const [isLoading, setIsLoading] = createSignal(false);

async function fetch_users() {
  setIsLoading(true);
  const res = await customFetch(`${API_URL}/users`);

  if (!res.ok) {
    setIsLoading(false);
    displayError(getError(await res.json()));

    return;
  }

  const users: User[] = await res.json();
  setUsers(users.reverse());
  setIsLoading(false);
}

const PanelPage: Component = () => {
  onMount(() => {
    fetch_posts();
    fetch_users();
  });

  return (
    <MetaProvider>
      <div class="Home">
        <Title>Creative Blogger - Home</Title>
        <Meta
          name="description"
          content="Creative Blogger - Projet collaboratif entre bloggers"
        />
      </div>
      <div class="p-3 w-full">
        <h1 class="text-center text-4xl">Utilisateurs :</h1>
        <div class=" w-11/12 grid grid-cols-2 m-auto md:grid-cols-4" id="users">
          <For each={users()} fallback={"Aucun utilisateur pour le moment..."}>
            {(user, _) => <UsersPreviewComponent user={user} />}
          </For>
        </div>
      </div>
    </MetaProvider>
  );
};

export default PanelPage;
export { setPosts, fetch_users };
