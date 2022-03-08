import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookList from "./BookList";
import SearchBooks from "./SearchBooks";
import { Route, Routes } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    query: "",
    books: [],
    booksApi: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      books = this.convertToOurFormat(books);
      books = books.filter((b) => b.type !== "none");
      this.setState({
        books,
      });
    });
  }

  convertToOurFormat = (books) => {
    if (Array.isArray(books)) {
      books = books.map((b) => ({
        id: b.id,
        title: b.title,
        authors: "authors" in b ? b.authors.join(", ") : "",
        backgroundUrl:
          "imageLinks" in b
            ? b.imageLinks.thumbnail
            : "https://www.claws.in/static/book-cover-placeholder-e1563706855534.jpg",
        type: "shelf" in b ? b.shelf : "none",
      }));
      return books;
    } else {
      return [];
    }
  };

  searchBooks = (query) => {
    BooksAPI.search(query).then((books) => {
      // books = books.slice(0, 20);
      books = this.convertToOurFormat(books);
      this.setState(() => ({ booksApi: books }));
    });
  };

  changeType = (event, id) => {
    const book = this.state.booksApi.filter((b) => b.id === id)[0];
    const otherBooks = this.state.books.filter((b) => b.id !== id);
    // let otherBooks = this.state.books.slice();
    // otherBooks.splice(index, 1);
    this.setState({
      books: [
        ...otherBooks,
        {
          id: book.id,
          title: book.title,
          authors: book.authors,
          backgroundUrl: book.backgroundUrl,
          type: event.target.value,
        },
      ],
    });
  };

  getBook = (event, id) => {
    const book = this.state.booksApi.filter((b) => b.id === id)[0];
    this.setState({
      books: [
        ...this.state.books,
        {
          id: book.id,
          title: book.title,
          authors: book.authors,
          backgroundUrl: book.backgroundUrl,
          type: event.target.value,
        },
      ],
    });
    BooksAPI.update(book, event.target.value);
  };

  render() {
    return (
      <div className="app">
        <Routes>
          <Route
            exact
            path="/search"
            element={
              <SearchBooks
                query={this.state.query}
                booksApi={this.state.booksApi}
                handleChange={this.getBook}
                searchBooks={(query) => {
                  this.searchBooks(query);
                }}
              />
            }
          />

          <Route
            exact
            path="/"
            element={
              <BookList books={this.state.books} changeType={this.changeType} />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
