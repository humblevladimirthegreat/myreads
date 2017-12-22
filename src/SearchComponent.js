import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookComponent from './BookComponent'
import {Link} from 'react-router-dom'
import BookshelfComponent from './BookshelfComponent'
import './App.css'

/**
* @description The search page
*/
class SearchComponent extends React.Component {

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query })
    query && query.length >= 3 && //guard since BooksAPI.search requires at least 3 characters
      BooksAPI.search(this.state.query).then((books) =>
        this.setState({books})
    ) //TODO: handle API failure
  }

  render() {
    const {query, books} = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">

          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BookshelfComponent
              name="Results"
              books={books}
            />
          </ol>
        </div>
      </div>
    )
  }
}
export default SearchComponent
