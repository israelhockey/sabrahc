import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// Fonts are bundled with the site (no Google Fonts request): Oswald headlines, Inter text, Heebo Hebrew.
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/heebo/400.css";
import "@fontsource/heebo/700.css";
import "@fontsource/heebo/900.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
