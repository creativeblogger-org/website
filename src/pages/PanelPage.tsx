import { Component, For, Show, createSignal, onMount } from "solid-js";
import UsersPreviewComponent from "../components/UsersPreviewComponent";
import {
  customFetch,
  displayError,
  getError,
  getHumanDate,
} from "../utils/functions_utils";
import { API_URL } from "../App";
import LoveIcon from "../assets/button_icons/love.png";
import PostPreviewComponent from "../components/PostPreviewComponent";
import VerifiedIcon from "../assets/button_icons/verified.png";

const [certifPosts, setCertifPosts] = createSignal([] as Post[]);
const [users, setUsers] = createSignal([] as User[]);
const [isLoading, setIsLoading] = createSignal(false);

const [page, setPage] = createSignal(1);

const [allPosts, setAllPosts] = createSignal([] as Post[]);

async function fetch_posts() {
  setIsLoading(true);
  const res = await customFetch(`${API_URL}/posts?limit=20&page=${page() - 1}`);

  if (!res.ok) {
    setIsLoading(false);
    displayError(getError(await res.json()));
    return;
  }

  const posts: Post[] = await res.json();
  setAllPosts(posts);
  setIsLoading(false);
}

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

async function fetch_posts_asking_certif() {
  setIsLoading(true);
  const res = await customFetch(`${API_URL}/panel/certif/ask`);

  if (!res.ok) {
    setIsLoading(false);
    displayError(getError(await res.json()));
    return;
  }

  const posts: Post[] = await res.json();
  setCertifPosts(posts);
  setIsLoading(false);
}

const PanelPage: Component = () => {
  onMount(() => {
    fetch_posts_asking_certif();
    fetch_users();
    fetch_posts();
  });

  const [showUsers, setShowUsers] = createSignal(false);
  const [showCertif, setshowCertif] = createSignal(false);
  const [showArticles, setshowArticles] = createSignal(false);

  return (
    <div class="p-3 w-full">
      <div class="grid grid-cols-3 mt-5 mb-9">
        <button
          onclick={() => {
            if (showUsers() === false) {
              setshowArticles(false);
              setshowCertif(false);
              setShowUsers(true);
            } else {
              setShowUsers(false);
            }
          }}
          class="mx-auto px-2 py-5 bg-blue-300 w-1/2 rounded-3xl duration-150 text-lg sm:text-2xl hover:bg-blue-400"
        >
          Liste d'utilisateurs
        </button>
        <button
          onclick={() => {
            if (showCertif() === false) {
              setShowUsers(false);
              setshowArticles(false);
              setshowCertif(true);
            } else {
              setshowCertif(false);
            }
          }}
          class="mx-auto px-2 py-5 bg-blue-300 w-1/2 rounded-3xl duration-150 text-lg sm:text-2xl hover:bg-blue-400"
        >
          Demandes de certification
        </button>
        <button
          onclick={() => {
            if (showArticles() === false) {
              setShowUsers(false);
              setshowCertif(false);
              setshowArticles(true);
            } else {
              setshowArticles(false);
            }
          }}
          class="mx-auto px-2 py-5 bg-blue-300 w-1/2 rounded-3xl duration-150 text-lg sm:text-2xl hover:bg-blue-400"
        >
          Liste des articles
        </button>
      </div>
      <Show when={showUsers()}>
        <h1 class="text-center text-4xl">Utilisateurs :</h1>
        <div
          class=" w-11/12 grid grid-cols-1 sm:grid-cols-2 m-auto md:grid-cols-3 xl:grid-cols-4"
          id="users"
        >
          <For each={users()} fallback={"Aucun utilisateur pour le moment..."}>
            {(user, _) => <UsersPreviewComponent user={user} />}
          </For>
        </div>
      </Show>
      <Show when={showCertif()}>
        <h1 class="text-center text-4xl">Posts demandant la certification :</h1>
        <div class="flex justify-center">
          <For each={certifPosts()} fallback={"Aucun post pour le moment..."}>
            {(post, _) => <h1>{post.title}</h1>}
          </For>
        </div>
      </Show>
      <Show when={showArticles()}>
        <h1 class="text-center text-4xl">Articles :</h1>
        <div
          class="m-auto w-11/12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 home"
          id="posts"
        >
          <For each={allPosts()} fallback={""}>
            {(post, _) => (
              <div class="rounded-md my-5 border border-slate-800 dark:border-white w-auto relative duration-150 hover:border-indigo-500 lg:mx-5">
                <img
                  src={post.image}
                  class="mx-auto rounded-3xl"
                  loading="lazy"
                  alt="Image of the article"
                />
                <h1 class="text-center font-bold text-3xl my-2">
                  {post.title}
                </h1>
                <h3 class="text-center italic text-xl mb-2">
                  {post.description}
                </h3>
                <p class="text-center mb-2">
                  Publié le {getHumanDate(post.created_at)}
                </p>
                <Show when={post.created_at != post.updated_at}>
                  <p class="text-center mb-2">
                    Mis à jour le {getHumanDate(post.updated_at)}
                  </p>
                </Show>
                <div class="flex justify-center items-center">
                  <img src={LoveIcon} class="mx-1" alt="love" />
                  <p class="text-xl">{post.likes}</p>
                </div>
                <h4 class="text-center">{post.views} vue(s)</h4>
                {post.is_verified === 1 && (
                  <div class="flex justify-center items-center mb-4">
                    <img
                      src={VerifiedIcon}
                      class="mx-0"
                      alt="Image de certification"
                    />
                    <p class="mx-2">Article Certifié</p>
                  </div>
                )}
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default PanelPage;
export { fetch_users };
