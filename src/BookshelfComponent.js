import React from 'react'
import BookComponent from './BookComponent'
import './App.css'

/**
* @description Represents a bookshelf
* @constructor
* @param {string} title - The name of the shelf
* @param {Object[]} books - The books (objects) on the shelf
* @param {function} updateShelf - the function from App.js that updates shelf
*/
const BookshelfComponent = (props) => (

      <div className="bookshelf">
        <h2 className="bookshelf-title">{props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {(props.books || []).map(book => (
              <li key={book.id}>
                <BookComponent
                  book={book}
                  updateShelf={props.updateShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
)
export default BookshelfComponent
