import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(() => {
    // Remember the last choice
    const stored = localStorage.getItem("theme");
    return stored === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">{dark ? "🌙" : "☀️"}</span>
      <button
        onClick={() => setDark(!dark)}
        className={`w-12 h-6 flex items-center rounded-full p-1 ${dark ? 'bg-gray-700' : 'bg-gray-300'}`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
            dark ? 'translate-x-6' : ''
          }`}
        ></div>
      </button>
    </div>
  );
};

export default DarkModeToggle;
