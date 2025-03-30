function validateNewUserInputs(user, setErrors, t) {
  const emailRegex = /^(?!.*@.*@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const newErrors = {};

  if (!user.firstName || user.firstName.trim() === "") {
    newErrors.firstName = t("firstNameRequired");
  }

  if (!user.lastName || user.lastName.trim() === "") {
    newErrors.lastName = t("lastNameRequired");
  }

  if (!user.email || user.email.trim() === "") {
    newErrors.email = t("emailRequired");
  } else if (!emailRegex.test(user.email)) {
    newErrors.email = t("invalidEmail");
  }

  if (!user.password || user.password.trim() === "") {
    newErrors.password = t("passwordRequired");
  } else if (user.password.length < 6) {
    newErrors.password = t("invalidPassword");
  }

  if (user.confirmPassword !== undefined && user.confirmPassword.trim() === "") {
    newErrors.confirmPassword = t("confirmPasswordRequired");
  }

  if (user.password && user.confirmPassword && user.password !== user.confirmPassword) {
    newErrors.confirmPassword = t("passwordMismatch");
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

export default validateNewUserInputs;
