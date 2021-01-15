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
        <Button location={location} />

        <div>
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title}
          />
          <h1>{movie.title}</h1>
          <p>Rating: {movie.vote_average}</p>
          <div>
            {!!movie.genres.length && <span>Genre:</span>}
            <ul>
              {movie.genres.map(({ name, id }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </div>
          <p>{movie.runtime} mins</p>
          <span>Overview: {movie.overview}</span>
        </div>

        <nav>
          <NavLink to={`${url}/cast`}>Cast</NavLink>
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
      </>
    )
  );
}
