import { Component, Show, createEffect, createSignal, onMount } from "solid-js";
import PostComponent from "../components/PostComponent";
import { customFetch, displayError, getError } from "../utils/functions_utils";
import ReloadImg from "../assets/button_icons/refresh.svg";
const [isLoading, setIsLoading] = createSignal(false);
import { Meta, MetaProvider, Title } from "@solidjs/meta";
import { API_URL } from "../App";

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

const [post, setPost] = createSignal({ author: {} } as PostWithoutComments);
const [comments, setComments] = createSignal([] as Comment[]);

const fetch_post_by_slug = async () => {
  const res = await customFetch(`${API_URL}${location.pathname}`);

  if (res.status === 404) {
    location.assign("/404");
  }

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  const post: Post = await res.json();
  setComments(post.comments);
  setPost(post);
};

const PostPage: Component = () => {
  onMount(() => {
    setPost({ author: {}, id: 0 } as Post);
    fetch_post_by_slug();
  });

  createEffect(() => {
    if (post()) {
      const pageTitle = `${post().title} - CB`;
      const pageDescription = `${post().description}`;
      const imageUrl = `${post().image}`;
      const pageTwitterTitle = `${post().title}`;
      const pageTwitterDescription = `${post().description}`;
      const pageTwitterImg = `${post().image}`;
      const pageTwitterCard = `app`;

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
    }
  });

  return (
    <div>
      <Show when={post().id === 0}>
        <div class="flex justify-center m-5">
          <button
            onclick={fetch_post_by_slug}
            class={`${
              isLoading() ? "animate-spin " : ""
            }rounded-full border-white`}
          >
            <img src={ReloadImg} class="h-8" alt="Reload image" />
          </button>
        </div>
      </Show>
      {/* <Show when={post().id != 0} fallback="Chargement..."> */}
      <MetaProvider>
        <PostComponent post={post()} comments={comments()} />
      </MetaProvider>
      {/* </Show> */}
    </div>
  );
};

export default PostPage;
export { fetch_post_by_slug };
