import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends Component {


  state = {
    query: '',
    showingBooks:[]
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

  onSearchBook = (query) => {
    console.log(query)

    
      BooksAPI.search(query).then((books)=> {
        console.log(books)
        if (books.error == "empty query"){
          this.setState({ showingBooks: [] })
        }else{
          this.setState({ showingBooks: books })
        }
        
      })
    

     
  }

  render() {


    const { query,showingBooks } = this.state    

    return (
        <div className="search-books">
        <div className="search-books-bar">
        <Link to="/"> <div className="close-search"></div></Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" 
              placeholder="Search by title or author" 
              onChange={(event) => this.onSearchBook(event.target.value)}
              />

          </div>
        </div>
        
        <div className="search-books-results">
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
      </div>
    )
  }
}

export default SearchBooks