import { useEffect } from "react";

export const ThemeToggle = () => {
  useEffect(() => {
    try {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } catch (e) {

    }
  }, []);

  return null; 
};