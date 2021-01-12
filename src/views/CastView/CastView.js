import * as moviesAPI from "../../services/movie-api";
import { useState, useEffect } from "react";

export default function CastView({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    moviesAPI
      .fetchMovieCast(movieId)
      .then((request) => {
        setCast(request.cast);
      })
      .catch(console.log);
  }, [movieId]);

  return (
    cast && (
      <>
        <div>
          <ul>
            {cast.map((item) => (
              <>
                {item.profile_path && (
                  <li key={item.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${item.profile_path}`}
                      alt={item.name}
                      widht="100"
                      height="150"
                    />
                    <p> {item.name}</p>
                  </li>
                )}
              </>
            ))}
          </ul>
        </div>
      </>
    )
  );
}
