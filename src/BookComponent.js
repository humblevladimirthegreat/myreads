import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BookComponent extends React.Component {

  render() {
    const authors = this.props.authors;
    const imageLink = this.props.imageLinks.thumbnail;
    // const shelf = this.props.shelf
    const title = this.props.title;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193,
            backgroundImage: `url("${imageLink}")`
           }}></div>
          {/* <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div> */}
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(", ")}</div>
      </div>

    )
  }
}
export default BookComponent
