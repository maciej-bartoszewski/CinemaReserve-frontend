function validateReservationInputs(reservation, setErrors, t) {
  const newErrors = {};

  if (!reservation.userEmail) {
    newErrors.userEmail = t("userEmailRequired");
  }

  if (!reservation.row || reservation.row <= 0) {
    newErrors.row = t("rowRequired");
  }

  if (!reservation.seat || reservation.seat <= 0) {
    newErrors.seat = t("seatRequired");
  }

  if (!reservation.screeningId) {
    newErrors.screeningId = t("screeningIdRequired");
  }

  if (!reservation.ticketTypeId) {
    newErrors.ticketTypeId = t("ticketTypeIdRequired");
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

export default validateReservationInputs;
