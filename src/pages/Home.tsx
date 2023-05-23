import { Component, For, createSignal,  onMount } from "solid-js";
import PostPreviewComponent from "../components/PostPreviewComponent";
import { NavLink } from "@solidjs/router";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import ReloadImg from "../assets/img/bb-reload-.svg";
import { error, setError } from "./RegisterPage";

const [posts, setPosts] = createSignal([] as Post[]);

async function fetch_posts() {
  const res = await fetch("https://api.creativeblogger.org/posts");

  if (!res.ok) {
    const error: ServerError = await res.json()
    setError(error.errors[0].message)
    return
  }

  const posts: Post[] = await res.json();
  setPosts(posts);
}

const Home: Component = () => {
  onMount(() => {
    setError("")
    fetch_posts()
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
          <button onclick={fetch_posts} class="rounded-full border-white">
            <img src={ReloadImg} class="h-8" alt="Reload image" />
          </button>
        </div>

        <div class="m-auto w-11/12 grid grid-cols-3" id="posts">
          <h2 class="text-center text-red-500 pt-3 text-2xl">{error()}</h2>
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
export { fetch_posts };
