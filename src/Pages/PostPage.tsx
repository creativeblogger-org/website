import { Component, Show, createSignal, onMount } from "solid-js";
import { Post } from "./Home";
import PostPageComponent from "../Components/PostPageComponent";
import { useParams } from "@solidjs/router";

const [post, setPost] = createSignal({
  author: {},
  id: 0,
} as Post);

const fetch_post_by_slug = async (url: string) => {
  const res = await fetch(url);
  const post: Post = await res.json();
  console.log("Fetched :");
  console.log(post);
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
      <PostPageComponent post={post()} />;
    </Show>
  );
};

export default PostPage;
export { post };
