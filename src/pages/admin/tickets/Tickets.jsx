import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getTickets,
  searchTickets,
  deleteTicket,
} from "../../../api/ticketsApiService";
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

function Tickets() {
  const { t, i18n } = useTranslation();
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTickets();
  }, [page, size, searchQuery]);

  async function fetchTickets() {
    try {
      setLoading(true);
      let response;
      if (searchQuery.trim()) {
        setPage(0);
        response = await searchTickets(searchQuery, page, size);
      } else {
        response = await getTickets(page, size);
      }
      setTickets(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Błąd pobierania biletów:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(ticketId) {
    const result = await ConfirmDialog({
      title: t("confirmDeleteTitle"),
      text: t("confirmDeleteText"),
      confirmText: t("confirmDeleteYes"),
      cancelText: t("confirmDeleteNo"),
    });

    if (result.isConfirmed) {
      try {
        await deleteTicket(ticketId);
        fetchTickets();
        SuccessDialog({
          title: t("deleteSuccessTitle"),
          text: t("deleteTicketSuccessText"),
        });
      } catch (error) {
        ErrorDialog({
          title: t("deleteErrorTitle"),
          text: t("deleteErrorText"),
        });
      }
    }
  }

  const columns = [
    t("id"),
    t("ticketNamePl"),
    t("ticketNameEn"),
    t("priceMultiplier"),
  ];
  const mobileVisibleIds = i18n.language === "pl" ? [0, 1] : [0, 2];

  const renderRowActions = (ticket) => (
    <>
      <EditButton
        link={`/tickets/edit/${ticket.ticketTypeId}`}
        text={t("edit")}
      />
      <DeleteButton
        action={() => handleDelete(ticket.ticketTypeId)}
        text={t("delete")}
      />
    </>
  );

  return (
    <section className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2 md:mb-3 lg:mb-4">
        <Title text={t("ticketList")} />
        <SearchBar
          className={"hidden lg:flex w-1/3 lg:w-1/2 mx-2"}
          placeholder={t("searchTicketPlaceholder")}
          isAdminSearch={true}
          onSearch={setSearchQuery}
        />
        <AddButton link={"/tickets/add"} text={t("addTicket")} />
      </div>
      <div className="flex w-full justify-center lg:hidden mb-2">
        <SearchBar
          className={"w-full md:w-2/3"}
          placeholder={t("searchTicketPlaceholder")}
          isAdminSearch={true}
          onSearch={setSearchQuery}
        />
      </div>
      {loading ? (
        <Loading />
      ) : tickets.length > 0 ? (
        <>
          <Table
            headers={columns}
            rows={tickets}
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
        <NotFoundComponent text={t("noTicketsFound")} />
      )}
    </section>
  );
}

export default Tickets;
