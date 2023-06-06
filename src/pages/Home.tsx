import { Component, For, Show, createEffect, createSignal } from "solid-js";
import PostPreviewComponent from "../components/PostPreviewComponent";
import { NavLink, useLocation, useNavigate } from "@solidjs/router";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import ReloadImg from "../assets/button_icons/refresh.svg";
import { customFetch, displayError, getError } from "../utils/functions_utils";
const [posts, setPosts] = createSignal([] as Post[]);
const [isLoading, setIsLoading] = createSignal(false);

const [page, setPage] = createSignal(1);

async function fetch_posts() {
  setIsLoading(true);
  const res = await customFetch(
    `https://api.creativeblogger.org/posts?limit=20&page=${page() - 1}`
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

  const navigate = useNavigate();

  return (
    <MetaProvider>
      <div class="Home">
        <Title>Creative Blogger - Home</Title>
        <Meta
          name="description"
          content="Creative Blogger - Projet collaboratif entre bloggers"
        />
      </div>
      <div class="p-3">
        <div class="flex justify-end w-11/12">
          <button
            onclick={fetch_posts}
            class={`${
              isLoading() ? "animate-spin " : ""
            }rounded-full border-white`}
          >
            <img src={ReloadImg} class="h-8" alt="Reload image" />
          </button>
        </div>

        <div class="m-auto w-11/12 grid grid-cols-2 md:grid-cols-3" id="posts">
          <For each={posts()} fallback={"Aucun post pour le moment..."}>
            {(post, _) => (
              <NavLink href={`/posts/${post.slug}`}>
                <PostPreviewComponent post={post} />
              </NavLink>
            )}
          </For>
        </div>
        <div class="gap-2 flex justify-center">
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
              class="flex w-1/6 duration-200 enabled:hover:rounded-2xl justify-center rounded-md enabled:shadow-indigo-500/50 enabled:bg-gradient-to-l enabled:from-indigo-500 enabled:to-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 enabled:focus-visible:outline-indigo-600 disabled:bg-gray-400"
              onclick={() => {
                location.search = `?page=${page() + 1}`;
              }}
              disabled={posts().length < 20}
            >
              Page suivante
            </button>
          </Show>
        </div>
      </div>
    </MetaProvider>
  );
};

export default Home;
export { setPosts, fetch_posts };
