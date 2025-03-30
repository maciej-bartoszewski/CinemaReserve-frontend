import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineTag } from "react-icons/hi";
import FormInput from "../../../components/form/FormInput";
import FormButton from "../../../components/form/FormButton";
import BigTitle from "../../../components/titles/BigTitle";
import SuccessDialog from "../../../components/dialogs/SuccessDialog";
import validateHallInputs from "../../../validation/validateHallInputs.jsx";
import { createHall } from "../../../api/hallsApiService";

function AddHall() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [hall, setHall] = useState({
    hallNamePl: "",
    hallNameEn: "",
    hallRows: "",
    seatsPerRow: "",
  });

  async function handleAddHall(event) {
    event.preventDefault();
    if (!validateHallInputs(hall, setErrors, t)) return;

    try {
      await createHall(hall);
      navigate(`/halls`);
      SuccessDialog({
        title: t("hallAddedSuccessfully"),
      });
    } catch (error) {
      setErrors({
        form:
          error.response?.status === 400
            ? t("invalidData")
            : error.response?.status === 409
              ? t("hallExists")
              : t("serverError"),
      });
    }
  }

  const formFields = [
    {
      name: "hallNamePl",
      placeholder: "enterHallNamePl",
      type: "text",
      icon: <HiOutlineTag />,
    },
    {
      name: "hallNameEn",
      placeholder: "enterHallNameEn",
      type: "text",
      icon: <HiOutlineTag />,
    },
    {
      name: "hallRows",
      placeholder: "enterHallRows",
      type: "number",
      icon: <HiOutlineTag />,
    },
    {
      name: "seatsPerRow",
      placeholder: "enterSeatsPerRow",
      type: "number",
      icon: <HiOutlineTag />,
    },
  ];

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col w-full max-w-lg justify-center items-center bg-bg2 shadow-2xl p-10 rounded-2xl">
        <BigTitle text={t("addHall")} />
        <form onSubmit={handleAddHall} className="flex flex-col w-full">
          {formFields.map(({ name, placeholder, type, icon }) => (
            <FormInput
              key={name}
              type={type}
              inputValue={hall[name]}
              setInputValue={(value) =>
                setHall((prev) => ({ ...prev, [name]: value }))
              }
              inputName={t(name)}
              icon={icon}
              placeholder={t(placeholder)}
              error={errors[name]}
            />
          ))}
          <FormButton buttonName={t("addHall")} />
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

export default AddHall;
