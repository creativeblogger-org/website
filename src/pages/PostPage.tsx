import { Component, Show, createSignal, onMount } from "solid-js";
import PostComponent from "../components/PostComponent";
import { customFetch, displayError, error, getError, success } from "../utils/functions_utils";
import { Meta, MetaProvider, Title } from "@solidjs/meta";

const [post, setPost] = createSignal({author: {}} as PostWithoutComments)
const [comments, setComments] = createSignal([] as Comment[]);

const fetch_post_by_slug = async () => {
  const res = await customFetch(`https://api.creativeblogger.org${location.pathname}`);

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
    <>
      <h2 class="text-center text-red-500 pt-3 text-2xl fixed top-0 w-screen">{error()}</h2>
      <h2 class="text-center text-green-600 pt-3 text-2xl fixed top-0 w-screen">{success()}</h2>
      <Show when={post().id != 0} fallback="Chargement...">
        <MetaProvider>
          <Title>{post().title} - Creative Blogger</Title>
          <Meta
            name="description"
            content="Creative Blogger - Projet collaboratif entre bloggers"
          />
          <PostComponent post={post()} comments={comments()} />;
        </MetaProvider>
      </Show>
    </>
  );
};

export default PostPage;
export { fetch_post_by_slug };
