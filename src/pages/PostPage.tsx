import { Component, Show, onMount } from "solid-js";
import PostComponent, { post, setPost } from "../components/PostComponent";
import { useParams } from "@solidjs/router";
import { displayError, getToken } from "../utils/functions_utils";
import { Meta, MetaProvider, Title } from "@solidjs/meta";

const fetch_post_by_slug = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });
  if (res.status == 404) {
    location.assign("/404")
  }

  if (!res.ok) {
    displayError(await res.json())
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
      <MetaProvider>
        <Title>{post().title} - Creative Blogger</Title>
        <Meta
          name="description"
          content="Creative Blogger - Projet collaboratif entre bloggers"
        />
        <PostComponent />;
      </MetaProvider>
    </Show>
  );
};

export default PostPage;
export { post, setPost };
