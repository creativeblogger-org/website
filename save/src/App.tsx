import { Routes, Route, Router } from "@solidjs/router";
import { Component, lazy } from "solid-js";

const Home = lazy(() => import("./pages/Home"));
const Error404 = lazy(() => import("./pages/Error404"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ResiterPage = lazy(() => import("./pages/RegisterPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const NavBar = lazy(() => import("./components/NavBar"));
const Footer = lazy(() => import("./components/Footer"));

const App: Component = () => {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<ResiterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path={"/posts/:slug"} element={<PostPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
