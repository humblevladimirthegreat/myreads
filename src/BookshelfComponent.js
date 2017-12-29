import React from 'react'
import BookComponent from './BookComponent'
import './App.css'

/**
* @description Represents a bookshelf
* @constructor
* @param {string} title - The name of the shelf
* @param {Array.<Object>} books - The books (objects) on the shelf
*/
class BookshelfComponent extends React.Component {

  render() {
    const books = this.props.books || [];
    const name = this.props.name;
    const updateShelf = this.props.updateShelf;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <BookComponent
                  book={book}
                  updateShelf={updateShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>

    )
  }
}
export default BookshelfComponent
