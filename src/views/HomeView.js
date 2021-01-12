import { useState, useEffect } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import * as moviesAPI from "../services/movie-api";

export default function HomePage() {
  const { url } = useRouteMatch();
  const [movie, setMovie] = useState(null);
  // console.log(url);
  useEffect(() => {
    moviesAPI
      .fetchTopMovie()
      .then((response) => {
        setMovie(response.results);
      })
      .catch(console.log);
  }, []);

  return (
    <>
      <div className="container">
        <ul>
          {movie &&
            movie.map((movie) => (
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
      </div>
    </>
  );
}
