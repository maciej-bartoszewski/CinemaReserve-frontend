import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  getMovies,
  searchMovies,
  deleteMovie,
} from "../../../api/moviesApiService";
import { getGenre } from "../../../api/genresApiService";
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

function Movies() {
  const { t, i18n } = useTranslation();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMovies();
  }, [page, size, searchQuery]);

  async function fetchMovies() {
    try {
      setLoading(true);
      let response;
      if (searchQuery.trim()) {
        setPage(0);
        response = await searchMovies(searchQuery, page, size);
      } else {
        response = await getMovies(page, size);
      }
      const moviesData = response.data.content;
      const allGenreIds = [
        ...new Set(moviesData.flatMap((movie) => movie.genreIds)),
      ];

      const genresResponse = await Promise.all(
        allGenreIds.map((id) => getGenre(id)),
      );

      const genresMap = genresResponse.reduce((acc, { data }) => {
        acc[data.genreId] =
          i18n.language === "pl" ? data.genreNamePl : data.genreNameEn;
        return acc;
      }, {});

      const moviesWithGenres = moviesData.map((movie) => {
        const genres = movie.genreIds.map((id) => genresMap[id]);
        return { ...movie, genres: genres.join(", ") };
      });

      setMovies(moviesWithGenres);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Błąd pobierania filmów:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(movieId) {
    const result = await ConfirmDialog({
      title: t("confirmDeleteTitle"),
      text: t("confirmDeleteText"),
      confirmText: t("confirmDeleteYes"),
      cancelText: t("confirmDeleteNo"),
    });

    if (result.isConfirmed) {
      try {
        await deleteMovie(movieId);
        fetchMovies();
        SuccessDialog({
          title: t("deleteSuccessTitle"),
          text: t("deleteMovieSuccessText"),
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
    t("titlePl"),
    t("titleEn"),
    t("duration"),
    t("genres"),
  ];
  const mobileVisibleIds = i18n.language === "pl" ? [0, 1] : [0, 2];

  const renderRowActions = (movie) => (
    <>
      <EditButton link={`/movies/edit/${movie.id}`} text={t("edit")} />
      <DeleteButton action={() => handleDelete(movie.id)} text={t("delete")} />
    </>
  );

  return (
    <section className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2 md:mb-3 lg:mb-4">
        <Title text={t("movieList")} />
        <SearchBar
          className={"hidden lg:flex w-1/3 lg:w-1/2 mx-2"}
          placeholder={t("searchMoviePlaceholder")}
          isAdminSearch={true}
          onSearch={setSearchQuery}
        />
        <AddButton link={"/movies/add"} text={t("addMovie")} />
      </div>
      <div className="flex w-full justify-center lg:hidden mb-2">
        <SearchBar
          className={"w-full md:w-2/3"}
          placeholder={t("searchMoviePlaceholder")}
          isAdminSearch={true}
          onSearch={setSearchQuery}
        />
      </div>
      {loading ? (
        <Loading />
      ) : movies.length > 0 ? (
        <>
          <Table
            headers={columns}
            rows={movies.map((movie) => ({
              id: movie.movieId,
              titlePl: movie.titlePl,
              titleEn: movie.titleEn,
              duration: movie.duration,
              genres: movie.genres,
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
        <NotFoundComponent text={t("noMoviesFound")} />
      )}
    </section>
  );
}

export default Movies;
