import { createEffect, createSignal } from "solid-js";

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = createSignal(
    localStorage.getItem("isDarkMode") === "true"
  );

  createEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode());
    localStorage.setItem("isDarkMode", isDarkMode().toString());
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode());
  };

  return (
    <label class="switch relative inline-block w-12 h-6 rounded-full cursor-pointer">
      <input
        type="checkbox"
        checked={isDarkMode()}
        onChange={toggleTheme}
        class="sr-only"
        id="themeSwitcherInput"
      />
      <span class="slider absolute top-0 left-0 w-12 h-6 rounded-full bg-white dark:bg-gray-800 shadow-md transform transition-transform cursor-pointer">
        <div class="absolute top-1 left-1 w-4 h-4 rounded-full bg-yellow-500 dark:bg-white transform transition-transform" />
      </span>
    </label>
  );
};

export default ThemeSwitcher;
