const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "3f80d4cf4eb52d6e9d2ef400ea3d2acb";

async function fetchWithErrorHandling(url = "", config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not found"));
}

export function fetchTopMovie() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );
}

export function fetchMovieById(id) {
  return fetchWithErrorHandling(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
}

export function fetchMovieCast(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
}

export function fetchMovieReviews(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`
  );
}

export function fetchMovieByName(name) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${name}`
  );
}
