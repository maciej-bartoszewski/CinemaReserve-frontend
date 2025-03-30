function validateScreeningInputs(screening, setErrors, t) {
  const newErrors = {};

  if (!screening.screeningDate) {
    newErrors.screeningDate = t("screeningDateRequired");
  }

  if (!screening.screeningTime) {
    newErrors.screeningTime = t("screeningTimeRequired");
  }

  const screeningDateTime = new Date(
    `${screening.screeningDate}T${screening.screeningTime}`,
  );
  if (screeningDateTime < new Date()) {
    newErrors.screeningTime = t("screeningTimeInPast");
  }

  if (!screening.ticketPrice || screening.ticketPrice <= 0) {
    newErrors.ticketPrice = t("ticketPriceRequired");
  }

  if (!screening.movieId) {
    newErrors.movieId = t("movieRequired");
  }

  if (!screening.hallId) {
    newErrors.hallId = t("hallRequired");
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

export default validateScreeningInputs;
