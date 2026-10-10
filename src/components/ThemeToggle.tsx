type Theme = "light" | "dark";

const systemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const current = (root.getAttribute("data-theme") as Theme | null) ?? systemTheme();
    const next: Theme = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage can be unavailable; the theme still switches for this visit */
    }
  };

  return (
    <button className="theme" onClick={toggle} aria-label="Switch colour theme">
      Theme
    </button>
  );
}
