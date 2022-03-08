import React, { Component } from "react";

class Book extends Component {
  render() {
    const { id, title, authors, backgroundUrl, type } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${backgroundUrl}")`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={type}
              onChange={(event) => {
                this.props.handleChange(event, id);
              }}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    );
  }
}

export default Book;
