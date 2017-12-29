import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import BookshelfComponent from './BookshelfComponent'
import './App.css'

/**
* @description The search component allows users to search for books and add them to shelves
*/
class SearchComponent extends React.Component {

  state = {
    query: '',  // the current search query
    books: []  //  the books returned by the search
  }

  /**
  * @description Calls the search API and stores the books
  * @param {string} query - the string the user entered
  * @param {Object[]} booksOnShelves - the book objects already on shelves
  */
  updateQuery = (query, booksOnShelves) => {
    this.setState({ query })
    query && query.length >= 3 && //guard since BooksAPI.search requires at least 3 characters
      BooksAPI.search(this.state.query).then((searchedBooks) => {
        let booksWithShelves = (searchedBooks || []).map((searchBook) => {
          const bookWithShelf = booksOnShelves.find((shelfBook) => (shelfBook.id === searchBook.id));
          return bookWithShelf || searchBook;
        });
        this.setState({books: booksWithShelves})
    }); //TODO: handle API failure
  }

  render() {
    const query = this.state.query
    const books = this.state.books || [];
    const updateShelf = this.props.updateShelf;
    const booksOnShelves = this.props.booksOnShelves;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value, booksOnShelves)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BookshelfComponent
              name="Results"
              books={books}
              updateShelf={updateShelf}
            />
          </ol>
        </div>
      </div>
    )
  }
}
export default SearchComponent
