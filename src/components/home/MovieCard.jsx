import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ScreeningBox from "./ScreeningBox.jsx";
import Genre from "./Genre.jsx";

const MovieCard = ({ movie }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="bg-bg1 rounded-xl shadow-lg overflow-hidden mb-6 flex flex-col sm:flex-row">
      <div className="sm:w-[300px]">
        <img
          onClick={() => navigate(`/movies/${movie.movieId}`)}
          src={movie.posterPath}
          alt={i18n.language === "pl" ? movie.titlePl : movie.titleEn}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
        />
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3
            className="text-3xl font-semibold text-primary cursor-pointer hover:text-secondary transition duration-300"
            onClick={() => navigate(`/movies/${movie.movieId}`)}
          >
            {i18n.language === "pl" ? movie.titlePl : movie.titleEn}
          </h3>

          <p className="text-gray-300 mt-2 line-clamp-3">
            {i18n.language === "pl" ? movie.descriptionPl : movie.descriptionEn}
          </p>

          <div className="flex flex-wrap gap-2 my-4">
            {movie.genres.map((genre) => (
              <Genre key={genre.id} genre={genre} />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {movie.screenings.map((screening) => (
            <ScreeningBox
              key={screening.id}
              screening={screening}
              bgcolor={"bg-bg2"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
