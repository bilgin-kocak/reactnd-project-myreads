import React, { Component } from "react";
import BookShelf from "./BookShelf";
import { useNavigate } from "react-router-dom";

class BookList extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={this.props.books.filter(
                (b) => b.type === "currentlyReading"
              )}
              changeType={this.props.changeType}
            />
            <BookShelf
              title="Want to Read"
              books={this.props.books.filter((b) => b.type === "wantToRead")}
              changeType={this.props.changeType}
            />
            <BookShelf
              title="Read"
              books={this.props.books.filter((b) => b.type === "read")}
              changeType={this.props.changeType}
            />
          </div>
        </div>
        <div className="open-search">
          <button
            onClick={() => {
              this.props.navigate("/search");
            }}
          >
            Add a book
          </button>
        </div>
      </div>
    );
  }
}

function BookListWithNavigate(props) {
  let navigate = useNavigate();
  return <BookList {...props} navigate={navigate} />;
}

export default BookListWithNavigate;

// export default BookList;
