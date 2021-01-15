import * as moviesAPI from "../../services/movie-api";
import { useState, useEffect } from "react";

export default function Reviews({ movieId }) {
  const [review, setReview] = useState(null);

  useEffect(() => {
    moviesAPI
      .fetchMovieReviews(movieId)
      .then((request) => {
        setReview(request);
      })
      .catch();
  }, [movieId]);

  return (
    <>
      {review && review.results.length ? (
        <div>
          <ul>
            {review.results.map((item, index) => (
              <>
                <li key={index}>
                  <h1>{item.author}</h1>
                  <p> {item.content}</p>
                </li>
              </>
            ))}
          </ul>
        </div>
      ) : (
        <p>There are no reviews for this movie</p>
      )}
    </>
  );
}
