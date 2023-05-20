import { Component, For, createSignal,  onMount } from "solid-js";
import PostComponent from "../components/PostComponent";
import { NavLink } from "@solidjs/router";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import ReloadImg from "../assets/img/bb-reload-.svg";

interface User {
  id: number;
  username: string;
  permission: number;
}

interface Comment {
  id: number;
  author: User;
  content: string;
  created_at: string;
  updated_at: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: User;
  comments: Comment[];
}

const [posts, setPosts] = createSignal([] as Post[]);

async function fetch_posts() {
  const res = await fetch("https://api.creativeblogger.org/posts");
  const posts: Post[] = await res.json();
  setPosts(posts);
}

const Home: Component = () => {
  onMount(() => fetch_posts());

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
          <For each={posts()} fallback={"Aucun post pour le moment..."}>
            {(post, _) => (
              <NavLink href={`/posts/${post.slug}`}>
                <PostComponent post={post} />
              </NavLink>
            )}
          </For>
        </div>
      </div>
    </MetaProvider>
  );
};

export default Home;
export type { Post };
