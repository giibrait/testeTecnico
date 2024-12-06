import { useState } from "react";

import "@/styles/globals.css";
import "devextreme/dist/css/dx.light.css"; // Tema claro
import "tailwindcss/tailwind.css"; // Tailwind

const MyApp = ({ Component, pageProps }: { Component: any; pageProps: any }) => {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? "dark" : ""}>
      <button
        onClick={() => setIsDark(!isDark)}
        className="m-4 px-4 py-2 bg-gray-800 text-white rounded shadow"
      >
        {isDark ? "Modo Claro" : "Modo Escuro"}
      </button>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;