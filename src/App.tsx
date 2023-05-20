import { Routes, Route, Router } from "@solidjs/router";
import { Component, lazy } from "solid-js";

const Home = lazy(() => import("./Pages/Home"));
const Error404 = lazy(() => import("./Pages/Error404"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const ResiterPage = lazy(() => import("./Pages/RegisterPage"));
const PostPage = lazy(() => import("./Pages/PostPage"));

const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<ResiterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path={"/posts/:slug"} element={<PostPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
};

export default App;
