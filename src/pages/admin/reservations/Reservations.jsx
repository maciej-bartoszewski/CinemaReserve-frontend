import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getReservations,
  searchReservations,
  deleteReservation,
} from "../../../api/reservationsApiService";
import { getTickets } from "../../../api/ticketsApiService.js";
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

function Reservations() {
  const { t, i18n } = useTranslation();
  const [reservations, setReservations] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchReservationsAndTicketTypes();
  }, [page, size, searchQuery]);

  async function fetchReservationsAndTicketTypes() {
    try {
      setLoading(true);

      const reservationsResponse = searchQuery.trim()
        ? await searchReservations(searchQuery, page, size)
        : await getReservations(page, size);

      const ticketsResponse = await getTickets();

      setReservations(reservationsResponse.data.content);
      setTotalPages(reservationsResponse.data.totalPages);
      setTicketTypes(ticketsResponse.data.content);
    } catch (error) {
      console.error("Error fetching reservations and ticket types:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(reservationId) {
    const result = await ConfirmDialog({
      title: t("confirmDeleteTitle"),
      text: t("confirmDeleteText"),
      confirmText: t("confirmDeleteYes"),
      cancelText: t("confirmDeleteNo"),
    });

    if (result.isConfirmed) {
      try {
        await deleteReservation(reservationId);
        fetchReservationsAndTicketTypes();
        SuccessDialog({
          title: t("deleteSuccessTitle"),
          text: t("deleteReservationSuccessText"),
        });
      } catch (error) {
        ErrorDialog({
          title: t("deleteErrorTitle"),
          text: t("deleteErrorText"),
        });
      }
    }
  }

  const getTicketTypeName = (ticketTypeId) => {
    const ticketType = ticketTypes.find(
      (type) => type.ticketTypeId === ticketTypeId,
    );
    return ticketType
      ? i18n.language === "pl"
        ? ticketType.ticketNamePl
        : ticketType.ticketNameEn
      : "";
  };

  const columns = [
    t("id"),
    t("userEmail"),
    t("row"),
    t("seat"),
    t("screeningId"),
    t("ticketTypeName"),
  ];
  const mobileVisibleIds = [0, 1, 4];

  const renderRowActions = (reservation) => (
    <>
      <EditButton
        link={`/reservations/edit/${reservation.reservationId}`}
        text={t("edit")}
      />
      <DeleteButton
        action={() => handleDelete(reservation.reservationId)}
        text={t("delete")}
      />
    </>
  );

  return (
    <section className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2 md:mb-3 lg:mb-4">
        <Title text={t("reservationList")} />
        <SearchBar
          className={"hidden lg:flex w-1/3 lg:w-1/2 mx-2"}
          placeholder={t("searchReservationPlaceholder")}
          isAdminSearch={true}
          onSearch={setSearchQuery}
        />
        <AddButton link={"/reservations/add"} text={t("addReservation")} />
      </div>
      <div className="flex w-full justify-center lg:hidden mb-2">
        <SearchBar
          className={"w-full md:w-2/3"}
          placeholder={t("searchReservationPlaceholder")}
          isAdminSearch={true}
          onSearch={setSearchQuery}
        />
      </div>
      {loading ? (
        <Loading />
      ) : reservations.length > 0 ? (
        <>
          <Table
            headers={columns}
            rows={reservations.map((reservation) => ({
              reservationId: reservation.reservationId,
              userEmail: reservation.userEmail,
              row: reservation.row,
              seat: reservation.seat,
              screeningId: reservation.screeningId,
              ticketTypeName: getTicketTypeName(reservation.ticketTypeId),
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
        <NotFoundComponent text={t("noReservationsFound")} />
      )}
    </section>
  );
}

export default Reservations;
