import { Component, For, createEffect, createSignal, onMount } from "solid-js";
import PostPreviewComponent from "../components/PostPreviewComponent";
import { NavLink } from "@solidjs/router";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import ReloadImg from "../assets/button_icons/refresh.svg";
import { customFetch, getError } from "../utils/functions_utils";
const [posts, setPosts] = createSignal([] as Post[]);
const [isLoading, setIsLoading] = createSignal(false);

async function fetch_posts() {
  setIsLoading(true);
  const res = await customFetch("https://api.creativeblogger.org/posts");

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
  onMount(() => fetch_posts());

  createEffect(() => {
    if (isLoading()) {
      document.querySelector(".reload-button")?.classList.add("animate-spin");
    }
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
      <div class="p-3">
        <div class="flex justify-end w-11/12">
          <button
            onclick={() => {
              fetch_posts();
            }}
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
      </div>
    </MetaProvider>
  );
};

export default Home;
export { setPosts, fetch_posts };
