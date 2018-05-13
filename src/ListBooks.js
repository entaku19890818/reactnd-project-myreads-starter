import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: '',
    };

   // this.onChangeShelf = this.onChangeShelf.bind(this);
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
    bookShelfName: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func
  }


  render() {
    const { books, bookShelfName} = this.props


    let showingBooks
    showingBooks = books.filter((book) => 
      {
        if (book.shelf != null && bookShelfName.match(book.shelf)) {
          return book
        }else if(book.shelf == null && bookShelfName == "none"){
          return book
        }
      }
    )



    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {showingBooks.length > 0 && showingBooks.map((book) => (
            <li key={book.id} className='list-books-content '>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" 
                    style={
                      book.imageLinks.thumbnail != null ? 
                      { width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}
                      : { width: 128, height: 193, backgroundImage: `url('./icons/question.svg')`}
                    }></div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf != null ? book.shelf : "none"} 
                      onChange={this.props.onChangeShelf} 
                      data-book-id={book.id}
                    >
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors != null && book.authors.map((author) => (
                  <div key={author} className="book-authors">{author}</div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListBooks