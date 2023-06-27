import { Component, Show, createSignal, onMount } from "solid-js";
import PostComponent from "../components/PostComponent";
import { customFetch, displayError, getError } from "../utils/functions_utils";
import ReloadImg from "../assets/button_icons/refresh.svg";
const [isLoading, setIsLoading] = createSignal(false);
import { Meta, MetaProvider, Title } from "@solidjs/meta";

const [post, setPost] = createSignal({ author: {} } as PostWithoutComments);
const [comments, setComments] = createSignal([] as Comment[]);

const fetch_post_by_slug = async () => {
  const res = await customFetch(
    `https://api.creativeblogger.org${location.pathname}`
  );

  if (res.status == 404) {
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
        <Title>{post().title} - Creative Blogger</Title>
        <Meta name="description" content={post().description} />
        <PostComponent post={post()} comments={comments()} />;
      </MetaProvider>
      {/* </Show> */}
    </div>
  );
};

export default PostPage;
export { fetch_post_by_slug };
