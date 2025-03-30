import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { HiOutlineTag } from "react-icons/hi";
import FormInput from "../../../components/form/FormInput";
import FormButton from "../../../components/form/FormButton";
import BigTitle from "../../../components/titles/BigTitle";
import SuccessDialog from "../../../components/dialogs/SuccessDialog";
import validateTicketInputs from "../../../validation/validateTicketInputs.jsx";

import { createTicket } from "../../../api/ticketsApiService";

function AddTicket() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});

  const [ticket, setTicket] = useState({
    ticketNamePl: "",
    ticketNameEn: "",
    priceMultiplier: "",
  });

  async function handleAddTicket(event) {
    event.preventDefault();
    if (!validateTicketInputs(ticket, setErrors, t)) return;

    try {
      await createTicket(ticket);
      navigate(`/tickets`);
      SuccessDialog({
        title: t("ticketAddedSuccessfully"),
      });
    } catch (error) {
      setErrors({
        form:
          error.response?.status === 400
            ? t("invalidData")
            : error.response?.status === 409
              ? t("ticketExists")
              : t("serverError"),
      });
    }
  }

  const formFields = [
    {
      name: "ticketNamePl",
      placeholder: "enterTicketNamePl",
      type: "text",
      icon: <HiOutlineTag />,
    },
    {
      name: "ticketNameEn",
      placeholder: "enterTicketNameEn",
      type: "text",
      icon: <HiOutlineTag />,
    },
    {
      name: "priceMultiplier",
      placeholder: "enterPriceMultiplier",
      type: "number",
      icon: <HiOutlineTag />,
    },
  ];

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col w-full max-w-lg justify-center items-center bg-bg2 shadow-2xl p-10 rounded-2xl">
        <BigTitle text={t("addTicket")} />
        <form onSubmit={handleAddTicket} className="flex flex-col w-full">
          {formFields.map(({ name, placeholder, type, icon }) => (
            <FormInput
              key={name}
              type={type}
              inputValue={ticket[name]}
              setInputValue={(value) =>
                setTicket((prev) => ({ ...prev, [name]: value }))
              }
              inputName={t(name)}
              icon={icon}
              placeholder={t(placeholder)}
              error={errors[name]}
            />
          ))}
          <FormButton buttonName={t("addTicket")} />
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

export default AddTicket;
