import React from "react";
import { useTranslation } from "react-i18next";

function Table({ headers, rows, renderActions, mobileVisibleIds }) {
  const { t } = useTranslation();

  return (
    <table className="w-full border-collapse bg-bg2">
      <thead>
        <tr className="bg-primary">
          {headers.map((header, index) => (
            <th
              key={index}
              className={`border border-gray-500 p-2 ${mobileVisibleIds.includes(index) ? "" : "hidden md:table-cell"}`}
            >
              {header}
            </th>
          ))}
          <th className="border border-gray-500 p-2">{t("actions")}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="border border-gray-500">
            {Object.values(row).map((value, colIndex) => (
              <td
                key={colIndex}
                className={`border border-gray-500 p-2 ${mobileVisibleIds.includes(colIndex) ? "" : "hidden md:table-cell"}`}
              >
                {value}
              </td>
            ))}
            <td className="p-2 flex justify-center flex-col md:flex-row text-center gap-2">
              {renderActions(row)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
