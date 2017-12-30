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
    books: [],   // the books returned by the search
    error: '',  // error message (if any)
  }

  /**
  * @description Calls the search API and stores the books
  * @param {string} query - the string the user entered
  * @param {Object[]} booksOnShelves - the book objects already on shelves
  */
  updateQuery = (query, booksOnShelves) => {
    this.setState({ query });
    if(query){
      BooksAPI.search(query).then((searchResponse) => {
        const searchedBooks = Array.isArray(searchResponse) ? searchResponse : [] // check if returned any books
        const booksWithShelves = searchedBooks.map((searchBook) => {
          searchBook.shelf = "none"; // default if book not found on shelf
          const bookWithShelf = booksOnShelves.find((shelfBook) => (shelfBook.id === searchBook.id));
          return bookWithShelf || searchBook; // if book on a shelf, then just use it. Otherwise use searched book
        });
        this.setState({books: booksWithShelves})
      }).catch((e) => {
        this.setState({error: "Error -- "+e});
        console.log('error:', e);
      });
    }
    else{
      this.setState({ books: [] });
    }
  }

  render() {
    const query = this.state.query;
    const books = this.state.books || [];
    const error = this.state.error;
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
          <div className="error-message">
            {error}
          </div>
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
