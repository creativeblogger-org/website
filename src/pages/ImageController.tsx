import { createEffect, createSignal } from "solid-js";
import ky from "ky";
import { getToken } from "../utils/functions_utils";

function UploadImage() {
  const [selectedImage, setSelectedImage] = createSignal<File | null>(null);

  async function handleImageUpload() {
    if (!selectedImage()) return;

    try {
      // Récupérer le token d'authentification
      const token = getToken();

      // Créer une instance ky avec les en-têtes
      const api = ky.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formData = new FormData();
      formData.append("image", selectedImage());

      // Effectuer la requête POST en utilisant l'instance ky avec les en-têtes
      const response = await api.post("http://localhost:3333/image/upload", {
        body: formData,
      });

      if (response.ok) {
        console.log("Image uploaded successfully");
        // Effectuer les actions supplémentaires si nécessaire
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
    }
  }

  function handleFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      setSelectedImage(inputElement.files[0]);
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
}

export default UploadImage;
