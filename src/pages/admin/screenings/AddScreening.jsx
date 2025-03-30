import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineTag } from "react-icons/hi";
import FormInput from "../../../components/form/FormInput";
import FormButton from "../../../components/form/FormButton";
import BigTitle from "../../../components/titles/BigTitle";
import SuccessDialog from "../../../components/dialogs/SuccessDialog";
import validateScreeningInputs from "../../../validation/validateScreeningInputs.jsx";
import { createScreening } from "../../../api/screeningsApiService";
import { getMovies } from "../../../api/moviesApiService";
import { getHalls } from "../../../api/hallsApiService";

function AddScreening() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [errors, setErrors] = useState({});
  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);

  const [screening, setScreening] = useState({
    screeningDate: "",
    screeningTime: "",
    ticketPrice: "",
    movieId: "",
    hallId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [moviesResponse, hallsResponse] = await Promise.all([
        getMovies(),
        getHalls(),
      ]);
      setMovies(moviesResponse.data.content);
      setHalls(hallsResponse.data.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleAddScreening(event) {
    event.preventDefault();
    if (!validateScreeningInputs(screening, setErrors, t)) return;
    try {
      await createScreening(screening);
      navigate(`/screenings`);
      SuccessDialog({
        title: t("screeningAddedSuccessfully"),
      });
    } catch (error) {
      setErrors({
        form:
          error.response?.status === 400
            ? t("invalidData")
            : error.response?.status === 409
              ? t("screeningExists")
              : t("serverError"),
      });
    }
  }

  const formFields = [
    {
      name: "screeningDate",
      placeholder: "enterScreeningDate",
      type: "date",
      icon: <HiOutlineTag />,
    },
    {
      name: "screeningTime",
      placeholder: "enterScreeningTime",
      type: "time",
      icon: <HiOutlineTag />,
    },
    {
      name: "ticketPrice",
      placeholder: "enterTicketPrice",
      type: "number",
      icon: <HiOutlineTag />,
    },
  ];

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col w-full max-w-lg justify-center items-center bg-bg2 shadow-2xl p-10 rounded-2xl">
        <BigTitle text={t("addScreening")} />
        <form onSubmit={handleAddScreening} className="flex flex-col w-full">
          {formFields.map(({ name, placeholder, type, icon }) => (
            <FormInput
              key={name}
              type={type}
              inputValue={screening[name]}
              setInputValue={(value) =>
                setScreening((prev) => ({ ...prev, [name]: value }))
              }
              inputName={t(name)}
              icon={icon}
              placeholder={t(placeholder)}
              error={errors[name]}
            />
          ))}
          <div className="flex flex-col">
            <label className="flex gap-1 items-center">
              <HiOutlineTag />
              {t("movie")}
            </label>
            <select
              value={screening.movieId}
              onChange={(e) =>
                setScreening((prev) => ({ ...prev, movieId: e.target.value }))
              }
              className="border-3 p-2 border-bg1 bg-bg1 outline-0 rounded-xl mb-2 transition duration-300 placeholder-gray-400 focus:border-primary hover:border-primary"
            >
              <option value="">{t("selectMovie")}</option>
              {movies.map((movie) => (
                <option key={movie.movieId} value={movie.movieId}>
                  {i18n.language === "pl" ? movie.titlePl : movie.titleEn}
                </option>
              ))}
            </select>
            {errors.movieId && (
              <p className="text-red-500 text-xxs md:text-sm text-center mt-1">
                {errors.movieId}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="flex gap-1 items-center">
              <HiOutlineTag />
              {t("hall")}
            </label>
            <select
              value={screening.hallId}
              onChange={(e) =>
                setScreening((prev) => ({ ...prev, hallId: e.target.value }))
              }
              className="border-3 p-2 border-bg1 bg-bg1 outline-0 rounded-xl mb-2 transition duration-300 placeholder-gray-400 focus:border-primary hover:border-primary"
            >
              <option value="">{t("selectHall")}</option>
              {halls.map((hall) => (
                <option key={hall.hallId} value={hall.hallId}>
                  {i18n.language === "pl" ? hall.hallNamePl : hall.hallNameEn}
                </option>
              ))}
            </select>
            {errors.hallId && (
              <p className="text-red-500 text-xxs md:text-sm text-center mt-1">
                {errors.hallId}
              </p>
            )}
          </div>
          <FormButton buttonName={t("addScreening")} />
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

export default AddScreening;
