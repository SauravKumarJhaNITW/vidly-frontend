import http from "./httpService";

const apiEndpoint = "/movies/";

export async function getMovies() {
  const { data: movies } = await http.get(apiEndpoint);
  return movies;
}

export async function getMovie(id) {
  const { data: movie } = await http.get(apiEndpoint + id);
  return movie;
}

export async function saveMovie(movie) {
  if (!movie._id) {
    const { data } = await http.post(apiEndpoint, movie);
    return data;
  } else {
    const body = { ...movie };
    delete body._id;
    const { data } = await http.put(apiEndpoint + movie._id, body);
    return data;
  }
}

export async function deleteMovie(id) {
  const { data } = await http.delete(apiEndpoint + id);
  return data;
}
