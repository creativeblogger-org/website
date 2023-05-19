import { Component, lazy, For, createSignal, onMount } from "solid-js";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import { useFavicon } from "solidjs-use";
import PostComponent from "../Components/PostComponent";
import Icon from "../Assets/img/bb-reload-.svg";

interface User {
  id: number;
  username: string;
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
  let res = await fetch("https://api.creativeblogger.org/posts");
  let posts: Post[] = JSON.parse(await res.text());
  setPosts(posts);
}

const [icon, setIcon] = useFavicon();

setIcon("/src/Assets/img/cb-logo.png");

const NavBar = lazy(() => import("../Components/NavBar"));
const Footer = lazy(() => import("../Components/Footer"));

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
        <NavBar />
        <div class="m-auto w-11/12 my-6 rounded-md">
          <div class="flex justify-end">
            <button
              onclick={fetch_posts}
              class="rounded-full border-white border-2 active:bg-gray-70"
            >
              <img src={Icon} class="h-8" alt="Reload" />
            </button>
          </div>
          <div class="grid grid-cols-3" id="posts">
            <For each={posts()} fallback={"Aucun post pour le moment..."}>
              {(post, _) => <PostComponent post={post} />}
            </For>
          </div>
        </div>
        <Footer />
      </div>
    </MetaProvider>
  );
};

export default Home;
export type { Post };
