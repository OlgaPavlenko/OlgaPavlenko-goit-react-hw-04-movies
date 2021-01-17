import { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
// eslint-disable-next-line
import s from "../SearchBar/SearchBar.module.css";
import * as moviesAPI from "../../services/movie-api";

export default function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (!query) {
      return;
    }

    onSubmit(query);
    // eslint-disable-next-line
  }, []);

  const onSubmit = (searchQuery) => {
    history.push({ ...location, search: `query=${searchQuery}` });
    if (!searchQuery) {
      return;
    }
    moviesAPI
      .fetchMovieByName(searchQuery)
      .then(({ results }) => setMovies(results))
      .catch();
  };

  const changeInput = (evt) => {
    evt.preventDefault();
    setSearchQuery(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (searchQuery.trim() !== "") {
      onSubmit(searchQuery);
    }
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="find your movie"
            value={searchQuery}
            onChange={changeInput}
          />
          <button type="submit">
            <span>Search</span>
          </button>
        </form>
      </header>
      <div className={s.wrapper}>
        <ul className={s.list}>
          {movies &&
            movies.map((movie) => (
              <li key={movie.id} className={s.item}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                  className={s.image}
                />
                <p className={s.title}>
                  <Link
                    to={{
                      pathname: `/movies/${movie.id}`,
                      state: { from: location },
                    }}
                    className={s.link}
                  >
                    {movie?.title}
                  </Link>
                </p>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
