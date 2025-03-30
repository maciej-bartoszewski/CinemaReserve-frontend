import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineTag } from "react-icons/hi";
import FormInput from "../../../components/form/FormInput";
import FormButton from "../../../components/form/FormButton";
import BigTitle from "../../../components/titles/BigTitle";
import SuccessDialog from "../../../components/dialogs/SuccessDialog";
import validateReservationInputs from "../../../validation/validateReservationInputs.jsx";
import { getErrorMessage } from "./reservationErrors.js";
import { createReservation } from "../../../api/reservationsApiService";
import { getTickets } from "../../../api/ticketsApiService.js";

function AddReservation() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [errors, setErrors] = useState({});
  const [ticketTypes, setTicketTypes] = useState([]);
  const [reservation, setReservation] = useState({
    userEmail: "",
    row: "",
    seat: "",
    screeningId: "",
    ticketTypeId: "",
  });

  useEffect(() => {
    fetchTicketTypes();
  }, []);

  async function fetchTicketTypes() {
    try {
      const response = await getTickets();
      setTicketTypes(response.data.content);
    } catch (error) {
      console.error("Error fetching ticket types:", error);
    }
  }

  const handleAddReservation = async (event) => {
    event.preventDefault();
    if (!validateReservationInputs(reservation, setErrors, t)) return;
    try {
      await createReservation(reservation);
      navigate(`/reservations`);
      SuccessDialog({ title: t("reservationAddedSuccessfully") });
    } catch (error) {
      setErrors({ form: getErrorMessage(error, t) });
    }
  };

  const formFields = [
    {
      name: "userEmail",
      placeholder: "enterEmail",
      type: "email",
      icon: <HiOutlineTag />,
    },
    {
      name: "row",
      placeholder: "enterRow",
      type: "number",
      icon: <HiOutlineTag />,
    },
    {
      name: "seat",
      placeholder: "enterSeat",
      type: "number",
      icon: <HiOutlineTag />,
    },
    {
      name: "screeningId",
      placeholder: "enterScreeningId",
      type: "number",
      icon: <HiOutlineTag />,
    },
  ];

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col w-full max-w-lg justify-center items-center bg-bg2 shadow-2xl p-10 rounded-2xl">
        <BigTitle text={t("addReservation")} />
        <form onSubmit={handleAddReservation} className="flex flex-col w-full">
          {formFields.map(({ name, placeholder, type, icon }) => (
            <FormInput
              key={name}
              type={type}
              inputValue={reservation[name]}
              setInputValue={(value) =>
                setReservation((prev) => ({ ...prev, [name]: value }))
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
              {t("ticketTypeName")}
            </label>
            <select
              value={reservation.ticketTypeId}
              onChange={(e) =>
                setReservation((prev) => ({
                  ...prev,
                  ticketTypeId: e.target.value,
                }))
              }
              className="border-3 p-2 border-bg1 bg-bg1 outline-0 rounded-xl mb-2 transition duration-300 placeholder-gray-400 focus:border-primary hover:border-primary"
            >
              <option value="">{t("selectTicketType")}</option>
              {ticketTypes.map((type) => (
                <option key={type.ticketTypeId} value={type.ticketTypeId}>
                  {i18n.language === "pl"
                    ? type.ticketNamePl
                    : type.ticketNameEn}
                </option>
              ))}
            </select>
            {errors.ticketTypeId && (
              <p className="text-red-500 text-xxs md:text-sm text-center mt-1">
                {errors.ticketTypeId}
              </p>
            )}
          </div>
          <FormButton buttonName={t("addReservation")} />
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

export default AddReservation;
