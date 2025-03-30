function validateLoginInputs(user, setErrors, t) {
  const emailRegex = /^(?!.*@.*@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const newErrors = {};

  if (!user.email) {
    newErrors.email = t("emailRequired");
  } else if (!emailRegex.test(user.email)) {
    newErrors.email = t("invalidEmail");
  }

  if (!user.password) {
    newErrors.password = t("passwordRequired");
  } else if (user.password.length < 6) {
    newErrors.password = t("invalidPassword");
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

export default validateLoginInputs;
