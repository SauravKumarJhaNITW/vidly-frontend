import React from "react";

const ListGroup = (props) => {
  let classes = "list-group-item list-group-item-action";
  // if (genre.name === currentGenre.name) classes += "active";
  return (
    <ul class="list-group">
      <li class={classes}>All Genres</li>
      <li class={classes}>dynamic</li>
    </ul>
  );
};

export default ListGroup;
