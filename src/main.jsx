import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import en from "./locales/en.json";
import pl from "./locales/pl.json";
import App from "./App.jsx";

i18n.init({
  resources: {
    en: { translation: en },
    pl: { translation: pl },
  },
  lng: "pl",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

createRoot(document.getElementById("root")).render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
