import { Meta, MetaProvider, Title } from "@solidjs/meta";
import { Component } from "solid-js";

const TermsPage: Component = () => {
  return (
    <MetaProvider>
      <Title>Creative Blogger</Title>
      <Meta
        name="description"
        content="Creative Blogger - Projet collaboratif entre bloggers"
      />
      <div class="flex justify-center">
        <p class="p-2 rounded-md border m-5 w-1/2">
          Veuillez rester cordial dans vos propos. Vous pouvez y exprimer vos
          opinions tout en respectant celles des autres.
          <br />
          Nous vous rappelons également que vous seul êtes responsable de ce que
          vous postez. Vous pouvez modifier ou supprimer vos posts qui, dans ce
          cas, seront supprimés de la base de données.
          <br />
          Creative Blogger Org ne peut en aucun cas être tenu responsable du
          contenu posté par ses membres.
          <br />
          Nous vous rappelons également que, dans un cadre juridique, nous
          stockons votre IP.
        </p>
      </div>
    </MetaProvider>
  );
};

export default TermsPage;
