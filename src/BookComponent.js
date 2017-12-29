import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

const DEFAULT_BOOK_IMAGE = "http://www.clker.com/cliparts/7/e/O/F/z/Y/blank-book-hi.png"

/**
* @description Represents a book
* @constructor
* @param {string} title - The title of the book
* @param {string[]} authors - The books (objects) on the shelf
* @param {string} imageLinks - the URLs to the thumbnail images
*/

class BookComponent extends React.Component {

  /**
  * @description Calls the search API and stores the books
  * @param {string} shelfValue - the value of this option [none, currentlyReading, wantToRead, read]
  * @param {string} shelfText - the text to display for this option
  * @param {string} currentShelf - the shelf of the book being considered [none, currentlyReading, wantToRead, read]
  */
  getOption(shelfValue, shelfText, currentShelf){
    if (shelfValue === currentShelf) {
      return (<option value={shelfValue} disabled="disabled">{shelfText + " (current)"}</option>);
    }
    else {
      return (<option value={shelfValue}>{shelfText}</option>);
    }
  }

  render() {
    const bookProps = this.props.book;
    const authors = bookProps.authors || [];
    const imageLink = bookProps.imageLinks ? bookProps.imageLinks.thumbnail : DEFAULT_BOOK_IMAGE;
    const title = bookProps.title;
    const updateShelf = this.props.updateShelf;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193,
            backgroundImage: `url("${imageLink}")`
           }}></div>
          <div className="book-shelf-changer">
            <select onChange={(event) => updateShelf(bookProps, event.target.value)}>
              {this.getOption("", "Move to...", bookProps.shelf)}
              {this.getOption("none", "None", bookProps.shelf)}
              {this.getOption("currentlyReading", "Currenty Reading", bookProps.shelf)}
              {this.getOption("wantToRead", "Want to Read", bookProps.shelf)}
              {this.getOption("read", "Read", bookProps.shelf)}
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(", ")}</div>
      </div>
    )
  }
}
export default BookComponent
