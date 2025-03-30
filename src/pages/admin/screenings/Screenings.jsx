import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getScreenings,
  searchScreenings,
  deleteScreening,
} from "../../../api/screeningsApiService";
import { getMovies } from "../../../api/moviesApiService";
import { getHalls } from "../../../api/hallsApiService";
import AddButton from "../../../components/admin/AddButton";
import EditButton from "../../../components/admin/EditButton";
import DeleteButton from "../../../components/admin/DeleteButton";
import SuccessDialog from "../../../components/dialogs/SuccessDialog";
import ErrorDialog from "../../../components/dialogs/ErrorDialog";
import ConfirmDialog from "../../../components/dialogs/confirmDialog";
import Title from "../../../components/titles/Title";
import Table from "../../../components/admin/Table";
import Pagination from "../../../components/pagination/Pagination";
import SearchBar from "../../../components/admin/SearchBar.jsx";
import Loading from "../../../components/common/Loading.jsx";
import NotFoundComponent from "../../../components/common/NotFoundComponent.jsx";

function Screenings() {
  const { t, i18n } = useTranslation();
  const [screenings, setScreenings] = useState([]);
  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, [page, size, searchQuery]);

  async function fetchData() {
    setLoading(true);
    try {
      const screeningsRequest = searchQuery.trim()
        ? searchScreenings(searchQuery, page, size)
        : getScreenings(page, size);
      const [screeningsResponse, moviesResponse, hallsResponse] =
        await Promise.all([screeningsRequest, getMovies(), getHalls()]);

      setScreenings(screeningsResponse.data.content);
      setTotalPages(screeningsResponse.data.totalPages);
      setMovies(moviesResponse.data.content);
      setHalls(hallsResponse.data.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(screeningId) {
    const result = await ConfirmDialog({
      title: t("confirmDeleteTitle"),
      text: t("confirmDeleteText"),
      confirmText: t("confirmDeleteYes"),
      cancelText: t("confirmDeleteNo"),
    });

    if (result.isConfirmed) {
      try {
        await deleteScreening(screeningId);
        fetchData();
        SuccessDialog({
          title: t("deleteSuccessTitle"),
          text: t("deleteScreeningSuccessText"),
        });
      } catch (error) {
        ErrorDialog({
          title: t("deleteErrorTitle"),
          text: t("deleteErrorText"),
        });
      }
    }
  }

  const getMovieTitle = (movieId) => {
    const movie = movies.find((movie) => movie.movieId === movieId);
    return movie
      ? i18n.language === "pl"
        ? movie.titlePl
        : movie.titleEn
      : "";
  };

  const getHallName = (hallId) => {
    const hall = halls.find((hall) => hall.hallId === hallId);
    return hall
      ? i18n.language === "pl"
        ? hall.hallNamePl
        : hall.hallNameEn
      : "";
  };

  const columns = [
    t("id"),
    t("screeningDate"),
    t("screeningTime"),
    t("ticketPrice"),
    t("movieTitle"),
    i18n.language === "pl" ? t("hallNamePl") : t("hallNameEn"),
  ];
  const mobileVisibleIds = [0, 1, 2];

  const renderRowActions = (screening) => (
    <>
      <EditButton
        link={`/screenings/edit/${screening.screeningId}`}
        text={t("edit")}
      />
      <DeleteButton
        action={() => handleDelete(screening.screeningId)}
        text={t("delete")}
      />
    </>
  );

  return (
    <section className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2 md:mb-3 lg:mb-4">
        <Title text={t("screeningList")} />
        <SearchBar
          className={"hidden lg:flex w-1/3 lg:w-1/2 mx-2"}
          placeholder={t("searchScreeningPlaceholder")}
          isAdminSearch={true}
          onSearch={setSearchQuery}
        />
        <AddButton link={"/screenings/add"} text={t("addScreening")} />
      </div>
      <div className="flex w-full justify-center lg:hidden mb-2">
        <SearchBar
          className={"w-full md:w-2/3"}
          placeholder={t("searchScreeningPlaceholder")}
          isAdminSearch={true}
          onSearch={setSearchQuery}
        />
      </div>
      {loading ? (
        <Loading />
      ) : screenings.length > 0 ? (
        <>
          <Table
            headers={columns}
            rows={screenings.map((screening) => ({
              screeningId: screening.screeningId,
              screeningDate: screening.screeningDate,
              screeningTime: screening.screeningTime,
              ticketPrice: screening.ticketPrice,
              movieTitle: getMovieTitle(screening.movieId),
              hallName: getHallName(screening.hallId),
            }))}
            renderActions={renderRowActions}
            mobileVisibleIds={mobileVisibleIds}
          />
          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      ) : (
        <NotFoundComponent text={t("noScreeningsFound")} />
      )}
    </section>
  );
}

export default Screenings;
