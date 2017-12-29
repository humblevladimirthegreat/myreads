import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookshelfComponent from './BookshelfComponent'
import SearchComponent from './SearchComponent'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  };

  retrieveBooks(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      this.retrieveBooks();
    });
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
