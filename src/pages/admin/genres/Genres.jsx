import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getGenres,
  searchGenres,
  deleteGenre,
} from "../../../api/genresApiService";
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

function Genres() {
  const { t, i18n } = useTranslation();
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchGenres();
  }, [page, size, searchQuery]);

  async function fetchGenres() {
    try {
      setLoading(true);
      let response;
      if (searchQuery.trim()) {
        setPage(0);
        response = await searchGenres(searchQuery, page, size);
      } else {
        response = await getGenres(page, size);
      }
      setGenres(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Błąd pobierania gatunków:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(genreId) {
    const result = await ConfirmDialog({
      title: t("confirmDeleteTitle"),
      text: t("confirmDeleteText"),
      confirmText: t("confirmDeleteYes"),
      cancelText: t("confirmDeleteNo"),
    });

    if (result.isConfirmed) {
      try {
        await deleteGenre(genreId);
        fetchGenres();
        SuccessDialog({
          title: t("deleteSuccessTitle"),
          text: t("deleteGenreSuccessText"),
        });
      } catch (error) {
        ErrorDialog({
          title: t("deleteErrorTitle"),
          text: t("deleteErrorText"),
        });
      }
    }
  }

  const columns = [t("id"), t("genreNamePl"), t("genreNameEn")];
  const mobileVisibleIds = i18n.language === "pl" ? [0, 1] : [0, 2];

  const renderRowActions = (genre) => (
    <>
      <EditButton link={`/genres/edit/${genre.genreId}`} text={t("edit")} />
      <DeleteButton
        action={() => handleDelete(genre.genreId)}
        text={t("delete")}
      />
    </>
  );

  return (
    <section className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2 md:mb-3 lg:mb-4">
        <Title text={t("genreList")} />
        <SearchBar
          className={"hidden lg:flex w-1/3 lg:w-1/2 mx-2"}
          placeholder={t("searchGenrePlaceholder")}
          isAdminSearch={true}
          onSearch={setSearchQuery}
        />
        <AddButton link={"/genres/add"} text={t("addGenre")} />
      </div>
      <div className="flex w-full justify-center lg:hidden mb-2">
        <SearchBar
          className={"w-full md:w-2/3"}
          placeholder={t("searchGenrePlaceholder")}
          isAdminSearch={true}
          onSearch={setSearchQuery}
        />
      </div>
      {loading ? (
        <Loading />
      ) : genres.length > 0 ? (
        <>
          <Table
            headers={columns}
            rows={genres}
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
        <NotFoundComponent text={t("noGenresFound")} />
      )}
    </section>
  );
}

export default Genres;
