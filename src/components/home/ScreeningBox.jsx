import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GoClock } from "react-icons/go";

function ScreeningBox({ screening, bgcolor }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div
      className={`p-4 rounded-lg shadow-2xl text-center min-w-[120px] w-fit ${bgcolor}`}
    >
      <div className="relative right-2">
        <p className="font-semibold text-lg flex flex-row items-center justify-center gap-1 text-center">
          <GoClock className="ml-1" />
          {screening.screeningTime.substring(0, 5)}
        </p>
      </div>
      <p className="text-sm text-gray-400">
        {i18n.language === "pl" ? screening.hallNamePl : screening.hallNameEn}
      </p>
      <button
        onClick={() => navigate(`/screening/${screening.screeningId}`)}
        className="w-full cursor-pointer bg-primary hover:bg-secondary text-white p-2 rounded transition mt-2"
      >
        {t("reserve")}
      </button>
    </div>
  );
}

export default ScreeningBox;
