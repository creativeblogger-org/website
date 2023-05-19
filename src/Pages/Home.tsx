import { Component, lazy } from "solid-js";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import { useFavicon } from "solidjs-use";

const [icon, setIcon] = useFavicon();

setIcon("/src/Assets/img/CB.webp");

const NavBar = lazy(() => import("../Components/NavBar"));
const Footer = lazy(() => import("../Components/Footer"));

const Home: Component = () => {
  return (
    <MetaProvider>
      <div class="Home">
        <Title>Creative Blogger - Home</Title>
        <Meta
          name="description"
          content="Creative Blogger - Projet collaboratif entre bloggers"
        />
        <NavBar />
        <Footer />
      </div>
    </MetaProvider>
  );
};

export default Home;
