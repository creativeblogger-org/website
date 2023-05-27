import { Component, lazy } from "solid-js";

const CreatePostComponent = lazy(() => import("../components/CreatePostComponent"));

const CreatePost: Component = () => {
  return (
    <div class="flex justify-center m-3 items-center">
      <p class="text-7xl">Créer un post :</p>
      <CreatePostComponent />
    </div>
  );
};

export default CreatePost;
