import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

/**
* @description Represents a book
* @constructor
* @param {string} title - The title of the book
* @param {Array.<String>} authors - The books (objects) on the shelf
* @param {string} imageLinks - the URLs to the thumbnail images
*/

class BookComponent extends React.Component {

  render() {
    const bookProps = this.props.book;
    const authors = bookProps.authors || [];
    const imageLink = bookProps.imageLinks.thumbnail; 
    const title = bookProps.title;
    const onUpdate = this.props.onUpdate;
    const bookRetriever = this.props.bookRetriever;
    console.log(`BookComponent received BookRetriever = ${bookRetriever}`)

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193,
            backgroundImage: `url("${imageLink}")`
           }}></div>
          <div className="book-shelf-changer">
            <select onChange={(event) => onUpdate(bookProps, event.target.value, bookRetriever)}>
              <option value="none">Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
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
