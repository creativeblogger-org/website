import { Component, For, Show, createEffect, createSignal } from "solid-js";
import PostPreviewComponent from "../components/PostPreviewComponent";
import { NavLink, useNavigate } from "@solidjs/router";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import ReloadImg from "../assets/button_icons/refresh.png";
import SearchLogo from "../assets/button_icons/search.png";
import {
  customFetch,
  displayError,
  getError,
  isNotConnected,
} from "../utils/functions_utils";
import { API_URL } from "../App";
import Loading from "../components/Loading";

declare global {
  interface Window {
    setMetaTags: (
      title: string,
      description: string,
      imageUrl: string,
      twitterTitle: string,
      twitterDescription: string,
      twitterImg: string,
      twitterCard: string
    ) => void;
  }
}

const [posts, setPosts] = createSignal([] as Post[]);
const [isLoading, setIsLoading] = createSignal(true);

const [page, setPage] = createSignal(1);

async function fetch_posts_by_tags(tag: string) {
  setIsLoading(true);
  const res = await customFetch(
    `${API_URL}/posts?tag=${tag}&limit=20&page=${page() - 1}`
  );

  if (!res.ok) {
    setIsLoading(false);
    displayError(getError(await res.json()));
    return;
  }

  const posts: Post[] = await res.json();
  setPosts(posts);
  setIsLoading(false);
}

async function fetch_posts() {
  setIsLoading(true);
  const res = await customFetch(`${API_URL}/posts?limit=20&page=${page() - 1}`);

  if (!res.ok) {
    setIsLoading(false);
    displayError(getError(await res.json()));
    return;
  }

  const posts: Post[] = await res.json();
  setPosts(posts);
  setIsLoading(false);
}

async function fetch_posts_by_content(content: string) {
  setIsLoading(true);
  const res = await customFetch(
    `${API_URL}/posts?q=${content}&limit=20&page=${page() - 1}`
  );

  if (!res.ok) {
    setIsLoading(false);
    displayError(getError(await res.json()));
    return;
  }

  const posts: Post[] = await res.json();
  setPosts(posts);
  setIsLoading(false);
}

const Home: Component = () => {
  createEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const paramValue = urlParams.get("page");
    setPage(parseInt(paramValue || "") || 1);
    fetch_posts();
  });

  const pageTitle = `Creative Blogger`;
  const pageDescription = `Projet collaboratif entre bloggers`;
  const imageUrl = `https://creativeblogger.org/assets/banner-93a4ec7f.png`;
  const pageTwitterTitle = `Creative Blogger`;
  const pageTwitterDescription = `Projet collaboratif entre bloggers. Notre objectif est de créer une plate-forme centralisé dans laquelle un max de bloggers seront présents.`;
  const pageTwitterImg = `https://creativeblogger.org/assets/banner-93a4ec7f.png`;
  const pageTwitterCard = `summary_large_image`;

  if (typeof window !== "undefined" && window.setMetaTags) {
    window.setMetaTags(
      pageTitle,
      pageDescription,
      imageUrl,
      pageTwitterTitle,
      pageTwitterDescription,
      pageTwitterImg,
      pageTwitterCard
    );
  }

  const navigate = useNavigate();

  const [searchContent, setSearchContent] = createSignal("");

  function handleInputChange(event: any) {
    setSearchContent(event.target.value);
    fetch_posts_by_content(searchContent());
  }

  const [isOpen, setIsOpen] = createSignal(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen());
  };

  return (
    <div class="p-3 pb-0">
      <div class="flex justify-end w-11/12">
        <div class="relative">
          <div class="flex">
            {isOpen() && (
              <div class="w-full bg-white rounded-md shadow-lg">
                {/* Input de recherche */}
                <input
                  type="text"
                  class="w-full h-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Recherchez un article..."
                  value={searchContent()}
                  onInput={handleInputChange}
                />
                {/* Autres éléments du menu de recherche */}
              </div>
            )}
            <button
              onClick={toggleMenu}
              class="text-gray-500 hover:text-gray-700 px-5 focus:outline-none"
            >
              <img loading="lazy" src={SearchLogo} alt="search" class="h-8" />
            </button>
          </div>
        </div>

        <button
          onclick={fetch_posts}
          class={`${
            isLoading() ? "animate-spin " : ""
          }rounded-full border-white`}
        >
          <img src={ReloadImg} class="h-8" alt="Reload image" />
        </button>
      </div>
      <Show when={isLoading()}>
        <Loading />
      </Show>
      <div
        class="m-auto w-11/12 grid grid-cols-1 lg:grid-cols-2 home"
        id="posts"
      >
        <For each={posts()} fallback={""}>
          {(post, _) => (
            <a href={`/posts/${post.slug}`}>
              <PostPreviewComponent post={post} />
            </a>
          )}
        </For>
      </div>
      <div class="gap-2 flex justify-center m-4">
        <Show when={posts().length != 0}>
          <Show when={page() > 1}>
            <button
              class="flex w-1/6 justify-center rounded-md shadow-indigo-500/50 bg-gradient-to-l from-teal-500 to-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onclick={() => {
                location.search = `?page=${page() - 1}`;
              }}
            >
              Page précédente
            </button>
          </Show>
          <button
            class="flex w-1/3 sm:w-1/6 duration-200 enabled:hover:rounded-2xl p-2 justify-center rounded-md enabled:shadow-indigo-500/50 enabled:bg-gradient-to-l enabled:from-indigo-500 enabled:to-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 enabled:focus-visible:outline-indigo-600 disabled:bg-gray-400"
            onclick={() => {
              location.search = `?page=${page() + 1}`;
            }}
            disabled={posts().length < 20}
          >
            Page suivante
          </button>
        </Show>
      </div>
      <Show when={isNotConnected() && isLoading() === false}>
        <h1 class="text-center text-orange-500 text-2xl my-4">
          Connectez-vous pour accéder à plus d'articles !
        </h1>
      </Show>
    </div>
  );
};

export default Home;
export { setPosts, fetch_posts, fetch_posts_by_tags };
