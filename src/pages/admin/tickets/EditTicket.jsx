import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { HiOutlineTag } from "react-icons/hi";

import FormInput from "../../../components/form/FormInput";
import FormButton from "../../../components/form/FormButton";
import BigTitle from "../../../components/titles/BigTitle";
import SuccessDialog from "../../../components/dialogs/SuccessDialog";
import validateTicketInputs from "../../../validation/validateTicketInputs.jsx";

import { getTicket, editTicket } from "../../../api/ticketsApiService";

function EditTicket() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [ticket, setTicket] = useState({
    ticketNamePl: "",
    ticketNameEn: "",
    priceMultiplier: "",
  });

  useEffect(() => {
    fetchTicketData();
  }, [id]);

  async function fetchTicketData() {
    try {
      const response = await getTicket(id);
      setTicket((prevTicket) => ({ ...prevTicket, ...response.data }));
    } catch (error) {
      console.error("Błąd pobierania danych biletu:", error);
    }
  }

  async function handleEditTicket(event) {
    event.preventDefault();
    if (!validateTicketInputs(ticket, setErrors, t)) return;

    try {
      await editTicket(id, ticket);
      navigate(`/tickets`);
      SuccessDialog({
        title: t("ticketEditedSuccessfully"),
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
        <BigTitle text={t("editTicket")} />
        <form onSubmit={handleEditTicket} className="flex flex-col w-full">
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

export default EditTicket;
