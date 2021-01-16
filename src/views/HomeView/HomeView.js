import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as moviesAPI from "../../services/movie-api";
import s from "../HomeView/HomeView.module.css";

export default function HomePage() {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    moviesAPI
      .fetchTopMovie()
      .then((response) => {
        setMovie(response.results);
      })
      .catch();
  }, []);

  return (
    <>
      <div className={s.wrapper}>
        <h2>Trending today</h2>
        <ul className={s.list}>
          {movie &&
            movie.map((movie) => (
              <Link to={`/movies/${movie.id}`} className={s.link}>
                <li key={movie.id} className={s.item}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                    alt={movie.title}
                    className={s.image}
                  />
                  <p className={s.title}>{movie.title}</p>
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </>
  );
}
