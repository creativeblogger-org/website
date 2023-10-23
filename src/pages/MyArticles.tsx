import { Component, For, Show, createEffect, createSignal } from "solid-js";
import { API_URL } from "../App";
import {
  customFetch,
  displayError,
  displaySuccess,
  getError,
  getHumanDate,
} from "../utils/functions_utils";
import { infos } from "../components/NavBar";
import VerifiedIcon from "../assets/button_icons/verified.png";
import LoveIcon from "../assets/button_icons/love.png";

const [showPopup, setShowPopup] = createSignal(false);

const [posts, setPosts] = createSignal([] as Post[]);
const [isLoading, setIsLoading] = createSignal(false);

const MyArtiles: Component = () => {
  async function fetch_posts() {
    setIsLoading(true);
    const res = await customFetch(`${API_URL}/posts?user=${infos().id}`);

    if (!res.ok) {
      setIsLoading(false);
      displayError(getError(await res.json()));
      return;
    }

    const posts: Post[] = await res.json();
    setPosts(posts);
    setIsLoading(false);
  }

  async function ask_certif(slug: string) {
    const res = await customFetch(`${API_URL}/global/ask-certif/${slug}`);

    if (!res.ok) {
      setShowPopup(true);
      displayError(getError(await res.json()));
      return;
    }

    displaySuccess("La demande a bien été effectué !");
  }

  createEffect(() => {
    fetch_posts();
  });

  return (
    <div>
      <Show when={showPopup()}>
        <div class="fixed p-[20vw] pt-[10vh] pb-[10vh] top-1/4 left-50% h-full z-[2] w-11/12">
          <form
            class=" bg-slate-800 text-white z-[3] relative p-10 rounded-xl text-center"
            id="post-form"
          >
            <button
              class="absolute top-0 right-0 p-2 font-bold hover:bg-red-600 rounded-tr-xl"
              onclick={() => setShowPopup(false)}
            >
              x
            </button>
            <h1 class="text-4xl pb-5 text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-indigo-500">
              Le post n'est pas éligible à la certification !
            </h1>
            <p class="my-3">
              La certification d'articles permet d'avoir un badge "Certifié" au
              dessus de votre article. Il différenciera votre article dit de
              "qualité" des autres articles non certifiés.
            </p>
            <p>Conditions :</p>
            <ul>
              <li>1. L'article doit avoir au moins 50 vues</li>
              <li>2. L'article doit dater d'au moins 1 semaine</li>
              <li>
                3. Le compte du rédacteur doit dater d'au moins 2 semaines
              </li>
            </ul>
          </form>
        </div>
      </Show>
      <h1 class="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-500 text-center text-6xl font-bold mt-5">
        Mes Articles
      </h1>
      <div
        class="m-auto w-11/12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
        id="posts"
      >
        <For each={posts()} fallback={"Aucun post pour le moment..."}>
          {(post, _) => (
            <div class="rounded-md my-5 border border-slate-800 dark:border-white w-auto relative duration-150 hover:border-indigo-500 lg:mx-5">
              <img
                src={post.image}
                class="mx-auto rounded-3xl"
                loading="lazy"
                alt="Image of the article"
              />
              <h1 class="text-center font-bold text-3xl my-2">{post.title}</h1>
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
              <div class="flex justify-center my-3">
                {post.is_verified === 0 && (
                  <button
                    onclick={() => {
                      ask_certif(post.slug);
                    }}
                    class="bg-green-500 p-2 rounded-3xl mx-3 text-white"
                  >
                    Demander la certification
                  </button>
                )}
                <button class="bg-red-500 p-2 rounded-3xl mx-3 text-white">
                  Supprimer le post
                </button>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default MyArtiles;
