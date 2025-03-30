function validateTicketInputs(ticket, setErrors, t) {
  const newErrors = {};

  if (!ticket.ticketNamePl || ticket.ticketNamePl.trim() === "") {
    newErrors.ticketNamePl = t("ticketNamePlRequired");
  }

  if (!ticket.ticketNameEn || ticket.ticketNameEn.trim() === "") {
    newErrors.ticketNameEn = t("ticketNameEnRequired");
  }

  if (!ticket.priceMultiplier || ticket.priceMultiplier <= 0) {
    newErrors.priceMultiplier = t("priceMultiplierRequired");
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

export default validateTicketInputs;
