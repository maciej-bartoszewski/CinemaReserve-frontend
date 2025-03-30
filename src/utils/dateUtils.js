export const convertDate = (date, i18n, withDay, withYear) => {
  return new Date(date).toLocaleDateString(
    i18n.language === "en" ? "en-GB" : "pl-PL",
    {
      ...(withDay && { weekday: "long" }),
      day: "2-digit",
      month: "2-digit",
      ...(withYear && { year: "numeric" }),
    },
  );
};
