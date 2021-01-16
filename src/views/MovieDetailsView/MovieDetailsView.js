import { useState, useEffect, lazy, Suspense } from "react";
import Button from "../../components/Button/Button";
import {
  NavLink,
  useParams,
  useRouteMatch,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import * as moviesAPI from "../../services/movie-api";
import Spinner from "../../components/Loader/Loader";
import s from "../MovieDetailsView/MovieDetailsView.module.css";

const CastView = lazy(() =>
  import("../CastView/CastView" /* webpackChunkName: "CastView" */)
);
const Reviews = lazy(() =>
  import("../Reviews/Reviews" /* webpackChunkName: "Reviews" */)
);

export default function MovieDetailsView() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  useEffect(() => {
    moviesAPI.fetchMovieById(movieId).then(setMovie).catch();
  }, [movieId]);
  return (
    movie && (
      <>
        <div className={s.movie}>
          <Button location={location} />

          <div className={s.container}>
            <img
              className={s.picture}
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
            />
            <div>
              <h1>{movie.title}</h1>
              <p>
                <b>Rating:</b> {movie.vote_average}
              </p>
              <div>
                {!!movie.genres.length && (
                  <ul className={s.genre}>
                    <b className={s.genreName}>Genre: </b>
                    {movie.genres.map(({ name, id }) => (
                      <li key={id} className={s.genreDiscr}>
                        {name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p>
                <b>Runtime: </b>
                {movie.runtime} mins
              </p>
              <span>
                <b>Overview:</b> {movie.overview}
              </span>
            </div>
          </div>

          <nav className={s.navigation}>
            <NavLink to={`${url}/cast`} className={s.cast}>
              Cast
            </NavLink>
            <NavLink to={`${url}/reviews`}>Reviews</NavLink>
          </nav>
          <hr />
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path={`${url}/cast`}>
                <CastView movieId={movieId} />
              </Route>

              <Route path={`${url}/reviews`}>
                <Reviews movieId={movieId} />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </>
    )
  );
}
