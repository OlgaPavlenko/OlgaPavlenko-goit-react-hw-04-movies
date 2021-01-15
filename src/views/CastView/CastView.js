import * as moviesAPI from "../../services/movie-api";
import { useState, useEffect } from "react";
import unknown from "../../images/unknown.jpg";

export default function CastView({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    moviesAPI
      .fetchMovieCast(movieId)
      .then((request) => {
        setCast(request.cast);
      })
      .catch();
  }, [movieId]);

  return (
    cast && (
      <>
        <div>
          <ul>
            {cast.map(({ name, profile_path }, index) => {
              let myImg = `https://image.tmdb.org/t/p/w200/${profile_path}`;
              if (!profile_path) {
                myImg = unknown;
              }
              return (
                <li key={index}>
                  <img src={myImg} alt={name} widht="100" height="150" />
                  <p> {name}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    )
  );
}
