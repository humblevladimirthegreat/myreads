import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookComponent from './BookComponent'
import './App.css'


class BookshelfComponent extends React.Component {

  render() {
    const books = this.props.books;
    const name = this.props.name;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li>
                <BookComponent
                  title={book.title}
                  authors={book.authors}
                  imageLinks={book.imageLinks}
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
