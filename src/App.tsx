import { Routes, Route, Router } from "@solidjs/router";
import { Component, lazy } from "solid-js";

const Home = lazy(() => import("./Pages/Home"));
const Error404 = lazy(() => import("./Pages/Error404"));

const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
};

export default App;
