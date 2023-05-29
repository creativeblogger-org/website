import { Routes, Route } from "@solidjs/router";
import { Component, Show, lazy } from "solid-js";
import favicon from "./assets/img/logo.png";
import { MetaProvider, Link } from "@solidjs/meta";
import { isConnected } from "./utils/functions_utils";

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
const MicorksenPage = lazy(() => import("./pages/Micorksen"));

const App: Component = () => {
  return (
    <>
      <MetaProvider>
        <div class="Home"></div>
        <Link rel="icon" type="image/png" sizes="128x128" href={favicon} />
      </MetaProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<ResiterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path={"/posts/:slug"} element={<PostPage />} />
        <Route path={"/create"} element={<CreatePost />} />
        <Route path={"/admin"} element={<PanelPage />} />
        <Route path={"/micorksen"} element={<MicorksenPage />} />
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
