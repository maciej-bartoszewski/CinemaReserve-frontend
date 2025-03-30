function validateMovieInputs(movie, setErrors, t) {
  const newErrors = {};

  if (!movie.titlePl || movie.titlePl.trim() === "") {
    newErrors.titlePl = t("titlePlRequired");
  }

  if (!movie.titleEn || movie.titleEn.trim() === "") {
    newErrors.titleEn = t("titleEnRequired");
  }

  if (!movie.descriptionPl || movie.descriptionPl.trim() === "") {
    newErrors.descriptionPl = t("descriptionPlRequired");
  }

  if (!movie.descriptionEn || movie.descriptionEn.trim() === "") {
    newErrors.descriptionEn = t("descriptionEnRequired");
  }

  if (!movie.duration || movie.duration <= 0) {
    newErrors.duration = t("durationRequired");
  }

  if (!movie.posterPath || movie.posterPath.trim() === "") {
    newErrors.posterPath = t("posterPathRequired");
  }

  if (!movie.trailerPath || movie.trailerPath.trim() === "") {
    newErrors.trailerPath = t("trailerPathRequired");
  }

  if (!movie.genreIds || movie.genreIds.length === 0) {
    newErrors.genreIds = t("genreIdsRequired");
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

export default validateMovieInputs;
