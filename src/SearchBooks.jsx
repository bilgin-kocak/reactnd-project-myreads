import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Book from "./Book";
// import BookShelf from "./BookShelf";

class SearchBooks extends Component {
  state = {
    query: "",
  };
  handleQuery = (event) => {
    this.setState({
      query: event.target.value,
    });
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => {
              this.props.navigate("/");
            }}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              value={this.state.query}
              onChange={(event) => {
                this.handleQuery(event);
                // this.props.searchBook = this.props.searchBook.bind(this);
                // console.log(this.props.searchBooks);
                this.props.searchBooks(event.target.value);
              }}
              placeholder="Search by title or author"
            />
          </div>
          {/* <button
            className="search"
            onClick={() => {
              this.props.searchBooks(this.state.query);
            }}
          >
            Search
          </button> */}
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.booksApi.map((book) => (
              <li key={this.props.booksApi.indexOf(book)}>
                <Book
                  id={book.id}
                  title={book.title}
                  authors={book.authors}
                  backgroundUrl={book.backgroundUrl}
                  type={book.type}
                  handleChange={this.props.handleChange}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

function SearchBooksWithNavigate(props) {
  const navigate = useNavigate();
  return <SearchBooks {...props} navigate={navigate} />;
}

export default SearchBooksWithNavigate;
// export default SearchBooks;
