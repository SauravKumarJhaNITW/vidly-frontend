import React from "react";

const SearchBox = ({ value, onSearch }) => {
  return (
    <div className="input-group mb-3">
      <input
        onChange={(e) => onSearch(e.currentTarget.value)}
        type="text"
        name="query"
        value={value}
        className="form-control my-3"
        placeholder="Searh..."
      />
    </div>
  );
};

export default SearchBox;
