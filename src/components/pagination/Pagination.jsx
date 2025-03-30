import React from "react";
import { useTranslation } from "react-i18next";
import PageButton from "./PageButton";

function Pagination({ page, totalPages, onPageChange }) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center mt-4">
      <PageButton text="<" action={() => onPageChange(page - 1)} disabled={page === 0} />
      <span className="px-3 py-1">
        {t("page")} {page + 1} {t("of")} {totalPages}
      </span>
      <PageButton text=">" action={() => onPageChange(page + 1)} disabled={page + 1 >= totalPages} />
    </div>
  );
}

export default Pagination;
