import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getMoviesSchedule } from "../api/moviesApiService.js";
import Loading from "../components/common/Loading.jsx";
import DateButton from "../components/home/DateButton.jsx";
import NotFoundComponent from "../components/common/NotFoundComponent.jsx";
import SmallTitle from "../components/titles/SmallTitle.jsx";
import MovieCard from "../components/home/MovieCard.jsx";
import { convertDate } from "../utils/dateUtils.js";

function Home() {
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    try {
      const response = await getMoviesSchedule();
      const scheduleData = response.data;
      const limitedSchedule = Object.keys(scheduleData)
        .sort()
        .slice(0, 7)
        .reduce((obj, key) => {
          obj[key] = scheduleData[key];
          return obj;
        }, {});
      setSchedule(limitedSchedule);
    } catch (error) {
      console.error("Error fetching home:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }
  if (schedule.length === 0) {
    return <NotFoundComponent text={t("noMoviesFound")} />;
  }

  return (
    <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-bg2 text-white rounded-lg shadow-lg">
      <>
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-6">
          <DateButton
            text={t("allScreenings")}
            date={null}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          {Object.keys(schedule).map((date) => (
            <DateButton
              key={date}
              text={convertDate(date, i18n)}
              date={date}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          ))}
        </div>

        <div className="mt-6">
          {Object.entries(schedule)
            .filter(([date]) => selectedDate === null || selectedDate === date)
            .map(([date, movies]) => (
              <div key={date}>
                <SmallTitle text={convertDate(date, i18n, true)} />

                {movies.map((movie) => (
                  <MovieCard key={movie.movieId} movie={movie} />
                ))}
              </div>
            ))}
        </div>
      </>
    </div>
  );
}

export default Home;
