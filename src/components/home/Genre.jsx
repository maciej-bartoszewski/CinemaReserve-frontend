import React from "react";
import { useTranslation } from "react-i18next";

function Genre({ genre }) {
  const { i18n } = useTranslation();

  return (
    <span className="bg-primary text-white px-3 py-1 rounded-full">
      {i18n.language === "pl" ? genre.genreNamePl : genre.genreNameEn}
    </span>
  );
}

export default Genre;
