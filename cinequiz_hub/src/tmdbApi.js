//
// TheMovieDB API utility for CineQuiz Hub
//
// Exports functions for fetching movie data (Hollywood & Kollywood) with API key authentication.
// Place in src/ for access across app features.
//
const TMDB_API_KEY = "5bc67d3b06aecbd18121a3cbbc16eb59";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

/**
 * PRIVATE UTILITY: attaches API key and sets up headers.
 */
function buildUrl(endpoint, params = {}) {
  const url = new URL(TMDB_BASE_URL + endpoint);
  url.searchParams.append("api_key", TMDB_API_KEY);
  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  }
  return url.toString();
}

// PUBLIC_INTERFACE
/**
 * Fetch movies matching a category/language.
 * @param {'en-US'|'ta-IN'} language Language code ('en-US' for Hollywood, 'ta-IN' for Kollywood)
 * @param {object} options Query params e.g., { query: 'movieName', page: 1 }
 * @returns {Promise<object>} Movies result
 */
export async function fetchMovies(language, options = {}) {
  // Uses /search/movie endpoint for flexible queries
  const params = {
    language,
    ...options,
  };
  const url = buildUrl("/search/movie", params);
  const res = await fetch(url);
  if (!res.ok) throw new Error("TMDB fetchMovies error: " + res.status);
  return res.json();
}

// PUBLIC_INTERFACE
/**
 * Fetch movie details by TMDB movie ID.
 * @param {number|string} movieId
 * @param {object} options (optional) e.g., { language: 'en-US' }
 * @returns {Promise<object>} Movie details
 */
export async function fetchMovieDetails(movieId, options = {}) {
  const url = buildUrl(`/movie/${movieId}`, options);
  const res = await fetch(url);
  if (!res.ok) throw new Error("TMDB fetchMovieDetails error: " + res.status);
  return res.json();
}

// PUBLIC_INTERFACE
/**
 * Discover popular movies for given language or filter set
 * @param {'en-US'|'ta-IN'} language
 * @param {object} options (optional) - extra params (page, region, etc.)
 * @returns {Promise<object>} List of movies
 */
export async function discoverMovies(language, options = {}) {
  const params = { language, ...options };
  const url = buildUrl("/discover/movie", params);
  const res = await fetch(url);
  if (!res.ok) throw new Error("TMDB discoverMovies error: " + res.status);
  return res.json();
}

// PUBLIC_INTERFACE
/**
 * Example: get Tamil movie results for Kollywood quizzes.
 * @param {object} [options]
 * @returns {Promise<object>} List of tamil movies
 */
export function fetchKollywoodMovies(options = {}) {
  // TMDB 'ta-IN' for Tamil, sort by popularity by default
  return discoverMovies("ta-IN", { sort_by: "popularity.desc", ...options });
}

// PUBLIC_INTERFACE
/**
 * Example: get English (Hollywood) movies.
 * @param {object} [options]
 * @returns {Promise<object>} List of English movies
 */
export function fetchHollywoodMovies(options = {}) {
  // TMDB 'en-US' for English, sort by popularity by default
  return discoverMovies("en-US", { sort_by: "popularity.desc", ...options });
}
