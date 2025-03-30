import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/common/Loading";
import ErrorPage from "./ErrorPage.jsx";
import { getScreeningData } from "../api/screeningsApiService";
import { createReservationsForUser } from "../api/reservationsApiService.js";
import BigTitle from "../components/titles/BigTitle.jsx";
import { useAuth } from "../security/AuthProvider.jsx";
import SuccessDialog from "../components/dialogs/SuccessDialog.jsx";
import ErrorDialog from "../components/dialogs/ErrorDialog.jsx";

function ScreeningSeats() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isLoggedIn, userId } = useAuth();
  const [screeningData, setScreeningData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTicketTypes, setSelectedTicketTypes] = useState({});

  useEffect(() => {
    fetchScreeningSeats();
  }, [id]);

  const fetchScreeningSeats = async () => {
    try {
      const response = await getScreeningData(id);
      setScreeningData(response.data);
    } catch (error) {
      console.error("Error fetching screening seats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReservation = async () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const reservationData = {
        screeningId: id,
        seats: selectedSeats,
        ticketTypeIds: selectedSeats.map(
          (seat) => selectedTicketTypes[`${seat.row}-${seat.seat}`] || 1,
        ),
      };
      try {
        await createReservationsForUser(userId, reservationData);
        navigate("/user-tickets");
        SuccessDialog({
          title: t("ticketsReserved"),
        });
      } catch (error) {
        ErrorDialog({
          title: t("ticketsReservedError"),
        });
      }
    }
  };

  const isSeatReserved = (row, seat) =>
    screeningData.reservedSeats.some((r) => r.row === row && r.seat === seat);

  const isSeatSelected = (row, seat) =>
    selectedSeats.some((s) => s.row === row && s.seat === seat);

  const toggleSeat = (row, seat) => {
    if (isSeatReserved(row, seat)) return;

    setSelectedSeats((current) =>
      isSeatSelected(row, seat)
        ? current.filter((s) => s.row !== row || s.seat !== seat)
        : [...current, { row, seat }],
    );
  };

  const calculateTotalPrice = () => {
    if (!screeningData) return 0;
    return selectedSeats.reduce((total, seat) => {
      const ticketType = selectedTicketTypes[`${seat.row}-${seat.seat}`] || 1;
      const priceMultiplier =
        screeningData.ticketTypes.find((t) => t.ticketTypeId === ticketType)
          ?.priceMultiplier || 1;
      return total + screeningData.baseTicketPrice * priceMultiplier;
    }, 0);
  };

  const handleTicketTypeChange = (row, seat, ticketTypeId) => {
    setSelectedTicketTypes((current) => ({
      ...current,
      [`${row}-${seat}`]: ticketTypeId,
    }));
  };

  if (loading) return <Loading />;
  if (!screeningData) return <ErrorPage />;

  return (
    <div className="h-full max-w-7xl flex justify-center items-center mx-auto">
      <div className="w-full mx-auto px-4 py-5 bg-bg2 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <BigTitle text={t("selectSeats")} />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3 bg-bg1 rounded-xl h-fit py-5">
            <div className="text-center mb-4 bg-bg2 w-[320px] mx-auto rounded-lg">
              {t("screen")}
            </div>

            <div className="grid gap-1.5">
              {[...Array(screeningData.hallRows)].map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex justify-center items-center gap-1.5"
                >
                  <p className="font-bold text-xs">{rowIndex + 1}</p>
                  {[...Array(screeningData.seatsPerRow)].map((_, seatIndex) => {
                    const seat = seatIndex + 1;
                    const row = rowIndex + 1;

                    return (
                      <button
                        key={seat}
                        disabled={isSeatReserved(row, seat)}
                        onClick={() => toggleSeat(row, seat)}
                        className={`
                        w-4 h-4 sm:w-8 sm:h-8 rounded transition
                        ${isSeatReserved(row, seat) ? "bg-bg2! cursor-not-allowed" : ""}
                        ${isSeatSelected(row, seat) ? "bg-primary" : "bg-green-600"}
                        ${!isSeatReserved(row, seat) && !isSeatSelected(row, seat) ? "hover:bg-primary/70 cursor-pointer" : ""}
                      `}
                      >
                        <p className="text-xxs">{seat}</p>
                      </button>
                    );
                  })}
                  <p className="font-bold text-xs">{rowIndex + 1}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex  justify-center gap-3">
              {[
                { color: "bg-green-600", label: "availableSeats" },
                { color: "bg-bg2", label: "reservedSeats" },
                { color: "bg-primary", label: "selectedSeats" },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1">
                  <div className={`w-4 h-4 ${color} rounded`} />
                  <span>{t(label)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-bg1 rounded-xl p-5 flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              {t("selectedSeats")}:
            </h3>

            <div className="flex-grow">
              {selectedSeats.map((seat) => (
                <div
                  key={`${seat.row}-${seat.seat}`}
                  className="mb-4 bg-bg2 p-3 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <span>
                      {t("seat")} {seat.row} - {seat.seat}
                    </span>
                    <select
                      value={
                        selectedTicketTypes[`${seat.row}-${seat.seat}`] || 1
                      }
                      onChange={(e) =>
                        handleTicketTypeChange(
                          seat.row,
                          seat.seat,
                          Number(e.target.value),
                        )
                      }
                      className="bg-bg1 border border-gray-600 rounded px-2 py-1 cursor-pointer"
                    >
                      {screeningData.ticketTypes.map((type) => (
                        <option
                          key={type.ticketTypeId}
                          value={type.ticketTypeId}
                        >
                          {i18n.language === "pl"
                            ? type.ticketNamePl
                            : type.ticketNameEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-600 pt-4">
              <div className="flex justify-between text-lg">
                <span>{t("total")}:</span>
                <span>{calculateTotalPrice().toFixed(2)} zł</span>
              </div>
            </div>

            <button
              disabled={selectedSeats.length === 0}
              className={`
              w-full mt-4 py-3 rounded-lg transition-colors
              ${
                selectedSeats.length > 0
                  ? "bg-primary hover:bg-primary/80 cursor-pointer"
                  : "bg-gray-600 cursor-not-allowed"
              }
            `}
              onClick={handleReservation}
            >
              {t("proceed")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScreeningSeats;
