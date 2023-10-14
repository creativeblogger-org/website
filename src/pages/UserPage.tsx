import {
  Component,
  For,
  Show,
  createEffect,
  createSignal,
  onMount,
} from "solid-js";
import {
  customFetch,
  displayError,
  findPermissions,
  getError,
  getHumanDate,
} from "../utils/functions_utils";
import { MetaProvider, Title } from "@solidjs/meta";
import { NavLink } from "@solidjs/router";
import PostPreviewComponent from "../components/PostPreviewComponent";
import { API_URL } from "../App";

const [user, setUser] = createSignal({} as User);

async function getUser() {
  const res = await customFetch(`${API_URL}${location.pathname}`);

  if (!res.ok) {
    displayError(getError(await res.json()));
    return;
  }

  const user: User = await res.json();

  setUser(user);
}

const [posts, setPosts] = createSignal([] as Post[]);
const [isLoading, setIsLoading] = createSignal(false);

const UserPage: Component = () => {
  onMount(() => {
    getUser();
    fetch_posts(user().id);
  });

  createEffect(() => {
    if (user().id) {
      fetch_posts(user().id);
    }
  });

  async function fetch_posts(id: number) {
    setIsLoading(true);
    const res = await customFetch(`${API_URL}/posts?user=${id}`);

    if (!res.ok) {
      setIsLoading(false);
      displayError(getError(await res.json()));
      return;
    }

    const posts: Post[] = await res.json();
    setPosts(posts);
    setIsLoading(false);
  }

  return (
    <div>
      <h1 class="text-center text-5xl m-7 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-500 ">
        Fiche d'identité d'utilisateur :{" "}
      </h1>
      <div class="p-2 border-2 rounded-md w-11/12 sm:w-1/2 xl:w-1/3 mx-auto duration-300 hover:border-indigo-500">
        <div class="flex justify-center items-end mt-7">
          <img
            src={user().pp}
            alt="Cet utilisateur n'a pas de photo de profile"
            class="h-20 rounded-3xl p-0 m-0 mx-1"
          />
          <h2 class="text-3xl m-1">
            <strong class="text-teal-500">{user().username}</strong>
          </h2>
        </div>
        <div class="text-center">
          <h2 class="text-3xl m-7">
            Rôle :{" "}
            <strong class="text-teal-500">
              {findPermissions(user().permission)}
            </strong>
          </h2>
          <h2 class="text-3xl m-7">
            Créé le{" "}
            <strong class="text-teal-500">
              {getHumanDate(user().created_at)}
            </strong>
          </h2>
        </div>
      </div>

      <Show when={user().permission >= 1}>
        <h2 class="text-3xl m-7 text-center">
          Article(s) posté(s) par l'utilisateur :
        </h2>
        <div class="m-auto w-11/12 grid grid-cols-1 md:grid-cols-2" id="posts">
          <For each={posts()} fallback={"Aucun post pour le moment..."}>
            {(post, _) => (
              <NavLink href={`/posts/${post.slug}`}>
                <PostPreviewComponent post={post} />
              </NavLink>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default UserPage;
