import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { genres } from "../services/fakeGenreService";
import { getMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  genres = [{ id: "", name: "--Select--" }, ...genres];
  constructor(props) {
    super(props);
    if (props.match.params.id === "new") {
      this.state = {
        data: {
          title: "",
          SelectedGenre: this.genres[0],
          numberInStock: "",
          rate: "",
        },
        errors: {},
      };
    } else {
      const movie = getMovie(props.match.params.id);
      const { title, genre, numberInStock, dailyRentalRate } = movie;
      this.state = {
        data: {
          title: title,
          SelectedGenre: genre,
          numberInStock: numberInStock,
          rate: dailyRentalRate,
        },
        errors: {},
      };
    }
  }
  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    rate: Joi.number().min(0).max(5).required().label("Rate"),
  };

  doSubmit = () => {
    //call the server
    console.log("submitted");
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", genres)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
