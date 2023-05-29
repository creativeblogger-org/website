import { Component, For, Show, createEffect, createSignal } from "solid-js";
import PostPreviewComponent from "../components/PostPreviewComponent";
import { NavLink } from "@solidjs/router";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import ReloadImg from "../assets/button_icons/refresh.svg";
import { customFetch, getError } from "../utils/functions_utils";
const [posts, setPosts] = createSignal([] as Post[]);
const [isLoading, setIsLoading] = createSignal(false);

const [page, setPage] = createSignal(1);

async function fetch_posts() {
  setIsLoading(true);
  const res = await customFetch(`https://api.creativeblogger.org/posts?limit=20&page=${page() - 1}`);

  if (!res.ok) {
    setIsLoading(false);
    if (res.status === 500) {
      alert("Erreur serveur");
      return;
    }
    return getError(await res.json());
  }

  const posts: Post[] = await res.json();
  setPosts(posts);
  setIsLoading(false);
}

const Home: Component = () => {
  createEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const paramValue = urlParams.get('page');
    setPage(parseInt(paramValue || "") || 1);
    fetch_posts()
  })

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

        <div class="m-auto w-11/12 grid grid-cols-3" id="posts">
          {/* <h2 class="text-center text-red-500 pt-3 text-2xl">{error()}</h2> */}
          <For each={posts()} fallback={"Aucun post pour le moment..."}>
            {(post, _) => (
              <NavLink href={`/posts/${post.slug}`}>
                <PostPreviewComponent post={post} />
              </NavLink>
            )}
          </For>
        </div>
        <Show when={posts().length != 0}>
          <Show when={page() > 1}>
            <button onclick={() => {
              location.search = `?page=${page() - 1}`
            }}>Page précédente</button>
          </Show>
          <button onclick={() => {
            location.search = `?page=${page() + 1}`
          }}>Page suivante</button>
        </Show>
      </div>
    </MetaProvider>
  );
};

export default Home;
export { setPosts, fetch_posts };
