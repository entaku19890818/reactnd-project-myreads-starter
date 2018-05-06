import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: '',
    };

    this.onChangeShelf = this.onChangeShelf.bind(this);
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
    bookShelfName: PropTypes.array.isRequired,
  }

  onChangeShelf = (event) => {
    let bookId = event.currentTarget.getAttribute('data-book-id')
    let shelf = event.target.value

    
    BooksAPI.get(bookId).then((book)=> {
      console.log(book)
      BooksAPI.update(book, shelf).then((res)=> {
        console.log(res)
      })
    })

     
  }

  render() {
    const { books, bookShelfName} = this.props


    let showingBooks
    showingBooks = books.filter((book) => 
      {
        console.log(bookShelfName)
        console.log(book.shelf)
        if (book.shelf != null && bookShelfName.match(book.shelf)) {
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
                    style={{ width: 128, height: 193, 
                    backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf != null ? book.shelf : "none"} onChange={this.onChangeShelf} data-book-id={book.id}>
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