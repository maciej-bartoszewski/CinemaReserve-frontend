function validateGenre(genre, setErrors, t) {
  const newErrors = {};

  if (!genre.genreNamePl || genre.genreNamePl.trim() === "") {
    newErrors.genreNamePl = t("genreNamePlRequired");
  }

  if (!genre.genreNameEn || genre.genreNameEn.trim() === "") {
    newErrors.genreNameEn = t("genreNameEnRequired");
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

export default validateGenre;
