import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookComponent from './BookComponent'
import BookshelfComponent from './BookshelfComponent'
import './App.css'

// const books = BooksAPI.getAll();
// console.log(books);
const TEST_BOOK_IDS = [
  'nggnmAEACAAJ', //Linux Command Line, currentlyRead
  'sJf1vQAACAAJ', //Learning Web Dev, currentlyRead
  'evuwdDLfAyYC', //Cuckoo's Calling, wantToRead
  '74XNzF_al3MC', //Lords of Finance, wantToRead
  'jAUODAAAQBAJ', //Needful Things, read
  'IOejDAAAQBAJ', //React, read
  '1wy49i-gQjIC', //Satire TV, read
]
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

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookshelfComponent
                name="Currently Reading"
                books={this.state.books.filter(book => book.shelf === "currentlyReading")}
              />
              <BookshelfComponent
                name="Want to Read"
                books={this.state.books.filter(book => book.shelf === "wantToRead")}
              />
              <BookshelfComponent
                name="Read"
                books={this.state.books.filter(book => book.shelf === "read")}
              />
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default BooksApp
