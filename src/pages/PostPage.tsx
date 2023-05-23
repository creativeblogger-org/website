import { Component, Show, createSignal, onMount } from "solid-js";
import { Post } from "./Home";
import PostComponent from "../components/PostComponent";
import { useParams } from "@solidjs/router";
import { getToken } from "../components/CreatePostButton";

const [post, setPost] = createSignal({
  author: {},
  id: 0,
} as Post);

const fetch_post_by_slug = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });

  if (!res.ok) {
    let fetch_error: ServerError = await res.json();
    alert(fetch_error.errors[0].message)
    return;
  }

  const post: Post = await res.json();
  setPost(post);
};

const PostPage: Component = () => {
  const params = useParams<{ slug: string }>();

  onMount(() => {
    setPost({ author: {}, id: 0 } as Post);
    fetch_post_by_slug(`https://api.creativeblogger.org/posts/${params.slug}`);
  });

  return (
    <Show when={post().id != 0} fallback="Loading...">
      <PostComponent />;
    </Show>
  );
};

export default PostPage;
export { post };
