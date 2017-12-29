import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookshelfComponent from './BookshelfComponent'
import SearchComponent from './SearchComponent'
import './App.css'

/**
* @description The main component that shows the books on shelves to users
*/
class BooksApp extends React.Component {
  state = {
    books: [], // the books on shelves
    error: ''  // any error message to be shown
  };

  /**
  * @description Gets books of current user from the server
  */
  retrieveBooks(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    }).catch((e) => {
      this.setState({error: "Error -- "+e});
      console.log('error:', e);
    });
  }

  /**
  * @description updates given book with a new shelf.
  * @param {Object} book - the book to be updated
  * @param {string} shelf - the new shelf of the book [none, currentlyReading, wantToRead, read]
  */

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      this.retrieveBooks();
    }).catch((e) => {
      this.setState({error: e.message});
      console.log('error:', e.message);
    });
  }

  componentDidMount() {
    this.retrieveBooks();
  }


  /**
  * @description shows the main page with shelves (as opposed to search page)
  */
  renderMainPage() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="error-message">
          {this.state.error}
        </div>
        <div className="list-books-content">
          <BookshelfComponent
            name="Currently Reading"
            books={this.state.books.filter(book => book.shelf === "currentlyReading")}
            updateShelf={this.updateShelf}
          />
          <BookshelfComponent
            name="Want to Read"
            books={this.state.books.filter(book => book.shelf === "wantToRead")}
            updateShelf={this.updateShelf}
          />
          <BookshelfComponent
            name="Read"
            books={this.state.books.filter(book => book.shelf === "read")}
            updateShelf={this.updateShelf}
          />
        </div>
        <Link
            to="/search"
            className="open-search"
            ><a>Add a book</a></Link>  {/* NOTE: getting rid of <a> makes image go away for some reason*/}
      </div>
    )
  }

  /**
  * @description Renders either main or search page depnding on URL route.
  */
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          this.renderMainPage()
        )} />
        <Route exact path="/search" render={() => (
          <SearchComponent
            updateShelf={this.updateShelf}
            booksOnShelves={this.state.books}
          />
        )} />
      </div>
    )
  }
}
export default BooksApp
