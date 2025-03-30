import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineTag } from "react-icons/hi";
import { MdImage } from "react-icons/md";
import FormInput from "../../../components/form/FormInput";
import FormButton from "../../../components/form/FormButton";
import BigTitle from "../../../components/titles/BigTitle";
import SuccessDialog from "../../../components/dialogs/SuccessDialog";
import validateMovieInputs from "../../../validation/validateMovieInputs.jsx";
import { getMovie, editMovie } from "../../../api/moviesApiService";
import { getAllGenres } from "../../../api/genresApiService";

function EditMovie() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movie, setMovie] = useState({
    titlePl: "",
    titleEn: "",
    descriptionPl: "",
    descriptionEn: "",
    duration: "",
    posterPath: "",
    trailerPath: "",
    genreIds: [],
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    try {
      const [movieResponse, genresResponse] = await Promise.all([
        getMovie(id),
        getAllGenres(),
      ]);
      setMovie((prevMovie) => ({ ...prevMovie, ...movieResponse.data }));
      setSelectedGenres(movieResponse.data.genreIds);
      setGenres(genresResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleEditMovie(event) {
    event.preventDefault();
    const updatedMovie = { ...movie, genreIds: selectedGenres };
    if (!validateMovieInputs(updatedMovie, setErrors, t)) return;

    try {
      await editMovie(id, updatedMovie);
      navigate(`/movies`);
      SuccessDialog({
        title: t("movieEditedSuccessfully"),
      });
    } catch (error) {
      setErrors({
        form:
          error.response?.status === 400
            ? t("invalidData")
            : error.response?.status === 409
              ? t("movieExists")
              : t("serverError"),
      });
    }
  }

  const handleGenreChange = (genreId) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(genreId)
        ? prevSelectedGenres.filter((id) => id !== genreId)
        : [...prevSelectedGenres, genreId],
    );
  };

  const formFields = [
    {
      name: "titlePl",
      placeholder: "enterTitlePl",
      type: "text",
      icon: <HiOutlineTag />,
    },
    {
      name: "titleEn",
      placeholder: "enterTitleEn",
      type: "text",
      icon: <HiOutlineTag />,
    },
    {
      name: "descriptionPl",
      placeholder: "enterDescriptionPl",
      type: "textarea",
      icon: <HiOutlineTag />,
    },
    {
      name: "descriptionEn",
      placeholder: "enterDescriptionEn",
      type: "textarea",
      icon: <HiOutlineTag />,
    },
    {
      name: "duration",
      placeholder: "enterDuration",
      type: "number",
      icon: <HiOutlineTag />,
    },
    {
      name: "posterPath",
      placeholder: "enterPosterPath",
      type: "text",
      icon: <HiOutlineTag />,
    },
    {
      name: "trailerPath",
      placeholder: "enterTrailerPath",
      type: "text",
      icon: <HiOutlineTag />,
    },
  ];

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col w-full max-w-lg justify-center items-center bg-bg2 shadow-2xl p-10 rounded-2xl">
        <BigTitle text={t("editMovie")} />
        <form onSubmit={handleEditMovie} className="flex flex-col w-full">
          {formFields.map(({ name, placeholder, type, icon }) => (
            <FormInput
              key={name}
              type={type}
              inputValue={movie[name]}
              setInputValue={(value) =>
                setMovie((prev) => ({ ...prev, [name]: value }))
              }
              inputName={t(name)}
              icon={icon}
              placeholder={t(placeholder)}
              error={errors[name]}
            />
          ))}

          <div>
            <label className="flex gap-1 items-center">
              <HiOutlineTag />
              {t("genres")}
            </label>
            <div className="flex flex-col gap-2 border-3 p-2 border-bg1 bg-bg1 outline-0 rounded-xl mb-2 transition duration-300  placeholder-gray-400">
              {genres.map((genre) => (
                <label key={genre.genreId} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={genre.genreId}
                    checked={selectedGenres.includes(genre.genreId)}
                    onChange={() => handleGenreChange(genre.genreId)}
                    id={`checkbox-${genre.genreId}`}
                    className="form-checkbox h-5 w-5"
                  />
                  <span>
                    {i18n.language === "pl"
                      ? genre.genreNamePl
                      : genre.genreNameEn}
                  </span>
                </label>
              ))}
            </div>
            {errors.genreIds && (
              <p className="text-red-500 text-xxs md:text-sm text-center">
                {errors.genreIds}
              </p>
            )}
          </div>

          {movie.posterPath && (
            <div className="mb-4">
              <label className="flex gap-1 items-center">
                <MdImage />
                {t("poster")}
              </label>
              <img
                src={movie.posterPath}
                alt="Poster"
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          <FormButton buttonName={t("saveChanges")} />
          {errors.form && (
            <p className="text-red-500 text-xxs md:text-sm text-center mt-2">
              {errors.form}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default EditMovie;
