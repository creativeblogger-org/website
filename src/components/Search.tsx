import { createSignal } from "solid-js";

const SearchMenu = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen());
  };

  return (
    <div class="relative">
      <button
        onClick={toggleMenu}
        class="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        Rechercher
      </button>
      {isOpen() && (
        <div class="absolute top-0 right-0 mt-2 w-64 bg-white rounded-md shadow-lg">
          {/* Input de recherche */}
          <input
            type="text"
            class="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Rechercher..."
          />
          {/* Autres éléments du menu de recherche */}
        </div>
      )}
    </div>
  );
};

export default SearchMenu;
