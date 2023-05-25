import { Component, lazy } from "solid-js";

const CreatePostButton = lazy(() => import("../components/CreatePostButton"));

const CreatePost: Component = () => {
  return (
    <div class="flex justify-center m-3 items-center">
      <p class="text-7xl">Créer un post :</p>
      <CreatePostButton />
    </div>
  );
};

export default CreatePost;