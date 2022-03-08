import React, { Component } from "react";
import Book from "./Book";

class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key={this.props.books.indexOf(book)}>
                <Book
                  id={book.id}
                  title={book.title}
                  authors={book.authors}
                  backgroundUrl={book.backgroundUrl}
                  type={book.type}
                  handleChange={this.props.changeType}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
