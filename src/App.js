import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookshelfComponent from './BookshelfComponent'
import SearchComponent from './SearchComponent'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  retrieveBooks(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf(book, shelf) {
    console.log(`updateShelf called with shelf ${shelf} and book ${book}`)
    if (shelf !== 'none'){
      this.bookapp = this;
      BooksAPI.update(book, shelf).then((response) => {
        console.log("Book updated");
        this.bookapp.retrieveBooks();
      });
    }
  }

  componentDidMount() {
    this.retrieveBooks();
  }

  renderMainPage() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookshelfComponent
            name="Currently Reading"
            books={this.state.books.filter(book => book.shelf === "currentlyReading")}
            onUpdate={this.updateShelf}
          />
          <BookshelfComponent
            name="Want to Read"
            books={this.state.books.filter(book => book.shelf === "wantToRead")}
            onUpdate={this.updateShelf}
          />
          <BookshelfComponent
            name="Read"
            books={this.state.books.filter(book => book.shelf === "read")}
            onUpdate={this.updateShelf}
          />
        </div>
        <Link
            to="/search"
            className="open-search"
            ><a>Add a book</a></Link>  {/* NOTE: getting rid of <a> makes image go away for some reason*/}
      </div>
    )
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          this.renderMainPage()
        )} />
        <Route exact path="/search" render={() => (
          <SearchComponent />
        )} />
      </div>
    )
  }
}
export default BooksApp
