import { Routes, Route } from "@solidjs/router";
import { Component, Show, lazy, onMount } from "solid-js";
import favicon from "./assets/img/logo2.png";
import { MetaProvider, Link } from "@solidjs/meta";
import {
  displayError,
  displaySuccess,
  error,
  isConnected,
  success,
  warning,
} from "./utils/functions_utils";

const API_URL = "https://api.creativeblogger.org"

const Home = lazy(() => import("./pages/Home"));
const CreatePostButton = lazy(() => import("./components/CreatePostComponent"));
const Error404 = lazy(() => import("./pages/Error404"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ResiterPage = lazy(() => import("./pages/RegisterPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const NavBar = lazy(() => import("./components/NavBar"));
const Footer = lazy(() => import("./components/Footer"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PanelPage = lazy(() => import("./pages/PanelPage"));
const MePage = lazy(() => import("./pages/MePage"));
const UserPage = lazy(() => import("./pages/UserPage"));
const BecomePage = lazy(() => import("./pages/BecomePage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const SocialPage = lazy(() => import("./pages/SocialPage"));

const App: Component = () => {
  onMount(() => {
    window.addEventListener("offline", () =>
      displayError("Tu es hors ligne !")
    );
    window.addEventListener("online", () =>
      displaySuccess("Tu es de nouveau en ligne !")
    );
  });

  return (
    <>
      <MetaProvider>
        <div class="Home bg-slate-700"></div>
        <Link rel="icon" type="image/png" href={favicon} />
      </MetaProvider>
      <Show when={error().length > 0}>
        <h2 class="text-center text-red-500 pt-3 bg-white opacity-90 text-2xl fixed top-0 w-screen">
          {error()}
        </h2>
      </Show>
      <Show when={success().length > 0}>
        <h2 class="text-center text-green-600 pt-3 bg-white opacity-75 text-2xl fixed top-0 w-screen">
          {success()}
        </h2>
      </Show>
      <Show when={warning().length > 0}>
        <h2 class="text-center text-red-600 pt-3 bg-white opacity-75 text-2xl fixed top-0 w-screen">
          {warning()}
        </h2>
      </Show>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<ResiterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path={"/posts/:slug"} element={<PostPage />} />
        <Route path={"/create"} element={<CreatePost />} />
        <Route path={"/admin"} element={<PanelPage />} />
        <Route path={"/profile"} element={<MePage />} />
        <Route path={"/users/:username"} element={<UserPage />} />
        <Route path={"/become"} element={<BecomePage />} />
        <Route path={"/terms"} element={<TermsPage />} />
        <Route path={"/social"} element={<SocialPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
      <Show when={isConnected()}>
        <CreatePostButton />
      </Show>
    </>
  );
};

export default App;
export { API_URL }