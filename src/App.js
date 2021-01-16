import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Container from "./components/Container/Container";
import AppBar from "./components/AppBar/AppBar";
import Spinner from "./components/Loader/Loader";

const HomeView = lazy(() =>
  import("./views/HomeView/HomeView" /* webpackChunkName: "HomeView" */)
);
const MoviesView = lazy(() =>
  import("./views/MoviesView/MoviesView" /* webpackChunkName: "MoviesView" */)
);
const MovieDetailsView = lazy(() =>
  import(
    "./views/MovieDetailsView/MovieDetailsView" /* webpackChunkName: "MovieDetailsView" */
  )
);

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies" exact>
            <MoviesView />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
