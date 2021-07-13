import React, { Component } from "react";
import { toast } from "react-toastify";
import { deleteMovie, getMovies } from "../services/movieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBar";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const res = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...res];
    this.setState({ movies: await getMovies(), genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("movie not found");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const ind = this.state.movies.indexOf(movie);
    movies[ind] = { ...movie };
    movies[ind].liked = !movie.liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({
      searchQuery: "",
      selectedGenre: genre,
      currentPage: 1,
    });
    console.log(this.state.searchQuery);
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchQuery) => {
    this.setState({
      searchQuery,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;

    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre) {
      filtered =
        selectedGenre && selectedGenre._id
          ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
          : allMovies;
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      genres,
      sortColumn,
      searchQuery,
    } = this.state;

    if (allMovies.length === 0) {
      return (
        <div>
          <p>There are no movies in the database.</p>
          {this.props.user && (
            <Link to="/movies/new" className="btn btn-primary">
              New Movie
            </Link>
          )}
        </div>
      );
    }
    const { totalCount, movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-4">
          <ListGroup
            selectedItem={selectedGenre}
            items={genres}
            onItemSelect={(genre) => this.handleGenreSelect(genre)}
          />
        </div>
        <div className="col">
          {this.props.user && (
            <Link to="/movies/new" className="btn btn-primary">
              New Movie
            </Link>
          )}
          <div className="m-2">
            Showing {totalCount} movies in the database.
          </div>
          <SearchBox onSearch={this.handleSearch} value={searchQuery} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
