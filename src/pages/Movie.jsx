import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getMovieInfo } from "../api/moviesApiService.js";
import Loading from "../components/common/Loading.jsx";
import NotFoundComponent from "../components/common/NotFoundComponent.jsx";
import Genre from "../components/home/Genre.jsx";
import ScreeningBox from "../components/home/ScreeningBox.jsx";
import { convertDate } from "../utils/dateUtils.js";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  async function fetchMovieDetails() {
    try {
      const response = await getMovieInfo(id);
      setMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }
  if (!movie) {
    return <NotFoundComponent text={t("movieNotFound")} />;
  }

  const groupedScreenings = movie.screenings.reduce((acc, screening) => {
    if (!acc[screening.screeningDate]) {
      acc[screening.screeningDate] = [];
    }
    acc[screening.screeningDate].push(screening);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-bg2 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="mx-auto sm:w-[30%] ">
          <img
            src={movie.posterPath}
            alt={i18n.language === "pl" ? movie.titlePl : movie.titleEn}
            className="w-full rounded-xl shadow-2xl object-cover aspect-[2/3]"
          />
        </div>

        <div className="space-y-6 sm:w-[70%]">
          <div className="border-b border-gray-600 pb-6">
            <h1 className="text-4xl font-bold text-primary mb-4">
              {i18n.language === "pl" ? movie.titlePl : movie.titleEn}
            </h1>
            <div className="flex items-center space-x-4 text-gray-300">
              <span>{movie.duration} min</span>
              <span className="h-4 w-px bg-gray-600"></span>
              <div className="flex space-x-2">
                {movie.genres.map((genre) => (
                  <Genre key={genre.id} genre={genre} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-300">
              {i18n.language === "pl"
                ? movie.descriptionPl
                : movie.descriptionEn}
            </p>
          </div>

          <div className="bg-bg1 rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              {t("screenings")}
            </h3>
            <div className="space-y-4">
              {Object.entries(groupedScreenings).map(([date, screenings]) => (
                <div key={date} className="bg-bg2 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-200 mb-3">
                    {convertDate(date, i18n, true)}
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {screenings.map((screening) => (
                      <ScreeningBox
                        key={screening.id}
                        screening={screening}
                        bgcolor={"bg-bg1"}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-bg1 rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              {t("trailer")}
            </h3>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${movie.trailerPath}`}
                title="Trailer"
                className="w-full h-full rounded-lg shadow-2xl"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
