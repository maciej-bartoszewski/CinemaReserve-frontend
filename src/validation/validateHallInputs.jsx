function validateHallInputs(hall, setErrors, t) {
  const newErrors = {};

  if (!hall.hallNamePl || hall.hallNamePl.trim() === "") {
    newErrors.hallNamePl = t("hallNamePlRequired");
  }

  if (!hall.hallNameEn || hall.hallNameEn.trim() === "") {
    newErrors.hallNameEn = t("hallNameEnRequired");
  }

  if (!hall.hallRows || hall.hallRows <= 0) {
    newErrors.hallRows = t("hallRowsRequired");
  }

  if (!hall.seatsPerRow || hall.seatsPerRow <= 0) {
    newErrors.seatsPerRow = t("seatsPerRowRequired");
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

export default validateHallInputs;
