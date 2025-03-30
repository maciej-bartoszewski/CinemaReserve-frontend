export const getErrorMessage = (error, t) => {
  if (!error.response) return t("serverError");

  const errorMessage = error.response.data.message;
  if (error.response.status === 400) {
    if (errorMessage.includes("Seat is already taken"))
      return t("seatAlreadyTaken");
    if (errorMessage.includes("Row is out of hall bounds"))
      return t("invalidRow");
    if (errorMessage.includes("Seat is out of hall bounds"))
      return t("invalidSeat");
    return t("invalidData");
  }

  if (error.response.status === 404) {
    if (errorMessage.includes("Screening not found"))
      return t("invalidScreening");
    if (errorMessage.includes("User not found")) return t("invalidUser");
    return t("invalidData");
  }

  if (error.response.status === 409) return t("reservationExists");
  return t("serverError");
};
