import { Component, Show, createSignal, onMount } from "solid-js";
import PostComponent from "../components/PostComponent";
import { useParams } from "@solidjs/router";
import { customFetch, getError } from "../utils/functions_utils";
import { Meta, MetaProvider, Title } from "@solidjs/meta";

const [error, setError] = createSignal("");
const [post, setPost] = createSignal({author: {}} as PostWithoutComments)
const [comments, setComments] = createSignal([] as Comment[]);

const fetch_post_by_slug = async (url: string) => {
  const res = await customFetch(url);

  if (res.status == 404) {
    location.assign("/404");
  }

  if (!res.ok) {
    setError(getError(await res.json()));
    return;
  }

  const post: Post = await res.json();
  setComments(post.comments);
  setPost(post);
};

const PostPage: Component = () => {
  const params = useParams<{ slug: string }>();

  onMount(() => {
    setPost({ author: {}, id: 0 } as Post);
    fetch_post_by_slug(`https://api.creativeblogger.org/posts/${params.slug}`);
  });

  return (
    <>
      <h2 class="text-center text-red-500 pt-3 text-2xl">{error()}</h2>
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
