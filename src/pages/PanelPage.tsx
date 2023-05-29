import { Component, For, createSignal, onMount } from "solid-js";
import PostPreviewComponent from "../components/PostPreviewComponent";
import UsersPreviewComponent from "../components/UsersPreviewComponent";
import { NavLink } from "@solidjs/router";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import ReloadImg from "../assets/button_icons/refresh.svg";
import { customFetch, getError } from "../utils/functions_utils";
import { fetch_posts } from "./Home";

const [posts, setPosts] = createSignal([] as Post[]);
const [users, setUsers] = createSignal([] as User[]);
const [isLoading, setIsLoading] = createSignal(false);

async function fetch_users() {
  setIsLoading(true);
  const res = await customFetch("https://api.creativeblogger.org/users");

  if (!res.ok) {
    setIsLoading(false);
    if (res.status === 500) {
      alert("Erreur serveur");
      return;
    }
    return getError(await res.json());
  }

  const users: User[] = await res.json();
  setUsers(users.reverse());
  setIsLoading(false);
}

const PanelPage: Component = () => {
  onMount(() => {
    fetch_posts()
    fetch_users()
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
        <h1 class="text-4xl text-center">Articles :</h1>
        <div class="m-auto w-11/12 grid grid-cols-2" id="posts">
          {/* <h2 class="text-center text-red-500 pt-3 text-2xl">{error()}</h2> */}
          <For each={posts()} fallback={"Aucun post pour le moment..."}>
            {(post, _) => (
              <NavLink href={`/posts/${post.slug}`}>
                <PostPreviewComponent post={post} />
              </NavLink>
            )}
          </For>
        </div>
        <hr class="m-5" />
        <h1 class="text-center text-4xl">Utilisateurs :</h1>
        <div class=" w-11/12 grid grid-cols-4 m-auto" id="users">
          {/* <h2 class="text-center text-red-500 pt-3 text-2xl">{error()}</h2> */}
          <For each={users()} fallback={"Aucun utilisateur pour le moment..."}>
            {(user, _) => <UsersPreviewComponent user={user} />}
          </For>
        </div>
      </div>
    </MetaProvider>
  );
};

export default PanelPage;
export { setPosts };
