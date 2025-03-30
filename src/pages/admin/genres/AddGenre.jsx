import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineTag } from "react-icons/hi";
import FormInput from "../../../components/form/FormInput";
import FormButton from "../../../components/form/FormButton";
import BigTitle from "../../../components/titles/BigTitle";
import SuccessDialog from "../../../components/dialogs/SuccessDialog";
import validateGenreInputs from "../../../validation/validateGenreInputs.jsx";
import { createGenre } from "../../../api/genresApiService";

function AddGenre() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});

  const [genre, setGenre] = useState({
    genreNamePl: "",
    genreNameEn: "",
  });

  async function handleAddGenre(event) {
    event.preventDefault();
    if (!validateGenreInputs(genre, setErrors, t)) return;

    try {
      await createGenre(genre);
      navigate(`/genres`);
      SuccessDialog({
        title: t("genreAddedSuccessfully"),
      });
    } catch (error) {
      setErrors({
        form:
          error.response?.status === 400
            ? t("invalidData")
            : error.response?.status === 409
              ? t("genreExists")
              : t("serverError"),
      });
    }
  }

  const formFields = [
    {
      name: "genreNamePl",
      placeholder: "enterGenreNamePl",
      type: "text",
      icon: <HiOutlineTag />,
    },
    {
      name: "genreNameEn",
      placeholder: "enterGenreNameEn",
      type: "text",
      icon: <HiOutlineTag />,
    },
  ];

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col w-full max-w-lg justify-center items-center bg-bg2 shadow-2xl p-10 rounded-2xl">
        <BigTitle text={t("addGenre")} />
        <form onSubmit={handleAddGenre} className="flex flex-col w-full">
          {formFields.map(({ name, placeholder, type, icon }) => (
            <FormInput
              key={name}
              type={type}
              inputValue={genre[name]}
              setInputValue={(value) =>
                setGenre((prev) => ({ ...prev, [name]: value }))
              }
              inputName={t(name)}
              icon={icon}
              placeholder={t(placeholder)}
              error={errors[name]}
            />
          ))}
          <FormButton buttonName={t("addGenre")} />
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

export default AddGenre;
