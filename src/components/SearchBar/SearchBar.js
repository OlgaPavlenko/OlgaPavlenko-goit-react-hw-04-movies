import { useState } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import s from "../SearchBar/SearchBar.module.css";
import * as moviesAPI from "../../services/movie-api";

export default function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const onSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);

    if (!searchQuery) {
      return;
    }
    moviesAPI
      .fetchMovieByName(searchQuery)
      .then(({ results }) => setMovies(results))
      .catch(console.log);
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

      <ul>
        {movies &&
          movies.map((movie) => (
            <li key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
              />
              <p>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </p>
            </li>
          ))}
      </ul>
    </>
  );
}
