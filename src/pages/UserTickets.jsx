import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  getReservationsInfo,
  getReservationsInfoForMovie,
} from "../api/reservationsApiService.js";
import Loading from "../components/common/Loading.jsx";
import NotFoundComponent from "../components/common/NotFoundComponent.jsx";
import SmallTitle from "../components/titles/SmallTitle.jsx";
import BigTitle from "../components/titles/BigTitle.jsx";
import { useAuth } from "../security/AuthProvider.jsx";
import { convertDate } from "../utils/dateUtils.js";
import Pagination from "../components/pagination/Pagination";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/admin/SearchBar.jsx";

function UserTickets() {
  const { userId } = useAuth();
  const navigation = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (userId) {
      fetchReservations();
    }
  }, [userId, page, size, searchQuery]);

  async function fetchReservations() {
    try {
      setLoading(true);
      let response;
      if (searchQuery.trim()) {
        setPage(0);
        response = await getReservationsInfoForMovie(
          searchQuery,
          userId,
          page,
          size,
        );
      } else {
        response = await getReservationsInfo(userId, page, size);
      }
      setReservations(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-10 bg-bg2 text-white rounded-xl shadow-2xl">
      <BigTitle text={t("myReservations")} className="mb-8 text-center" />
      <SearchBar
        className={"w-full md:w-2/3 mx-auto mb-5"}
        placeholder={t("searchTickets")}
        onSearch={setSearchQuery}
        value={searchQuery}
      />
      {reservations.length === 0 ? (
        <NotFoundComponent text={t("noReservationsFound")} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reservations.map((reservation, index) => (
            <div
              key={index}
              className="bg-bg1 rounded-xl px-6 py-6 shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="mb-6 rounded-lg">
                <img
                  onClick={() => navigation(`/movies/${reservation.movieId}`)}
                  src={reservation.posterPath}
                  alt={
                    i18n.language === "pl"
                      ? reservation.movieTitlePl
                      : reservation.movieTitleEn
                  }
                  className="w-[300px] h-[400px] object-cover rounded-lg mx-auto transition duration-300 hover:scale-105 cursor-pointer"
                />
              </div>
              <SmallTitle
                text={
                  i18n.language === "pl"
                    ? reservation.movieTitlePl
                    : reservation.movieTitleEn
                }
                color="text-primary mb-4 text-center"
              />
              <div className="space-y-1">
                <p className="flex justify-between">
                  <span className="font-bold">{t("screeningDate")}:</span>
                  <span>
                    {convertDate(reservation.date, i18n, false, true)}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="font-bold">{t("screeningTime")}:</span>
                  <span>{reservation.time.substring(0, 5)}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-bold">{t("hall")}:</span>
                  <span>
                    {i18n.language === "pl"
                      ? reservation.hallNamePl
                      : reservation.hallNameEn}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="font-bold">{t("row")}:</span>
                  <span>{reservation.row}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-bold">{t("seat")}:</span>
                  <span>{reservation.seat}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-bold">{t("ticketTypeName")}:</span>
                  <span>
                    {i18n.language === "pl"
                      ? reservation.ticketTypeNamePl
                      : reservation.ticketTypeNameEn}
                  </span>
                </p>
                <p className="flex justify-between mt-4">
                  <span className="font-bold text-primary">
                    {t("ticketPrice")}:
                  </span>
                  <span className="font-semibold">
                    {reservation.price.toFixed(2)} PLN
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

export default UserTickets;
