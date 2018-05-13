import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'


class SearchBooks extends Component {


  state = {
    query: '',
    showingBooks:[],
    isNoResult : false
  }





  onSearchBook = (query) => {
      BooksAPI.search(query).then((books)=> {
        console.log("showingBooks")
        console.log(books)
        if (!books || books.error == "empty query"){
          this.setState({ showingBooks: [], isNoResult:true})

        }else{
          this.setState({ showingBooks: books, isNoResult:false})
        }
      })
      this.getMyBooks()

  }

  getMyBooks = () =>  {
    BooksAPI.getAll().then((books) => {

      books.forEach((book, i, books) => {
        const showingBooks = this.state.showingBooks.slice()
        showingBooks.forEach((showingBook, j, showingBooks) => {
          if(book.id == showingBook.id){
            showingBooks[j] = book
            this.setState({ showingBooks: showingBooks })
          }
        })
      })

    })
  }

  onChangeShelf = (event) => {
    let bookId = event.currentTarget.getAttribute('data-book-id')
    let shelf = event.target.value

    
    BooksAPI.get(bookId).then((book)=> {
      BooksAPI.update(book, shelf).then((res)=> {
        this.getMyBooks()
      })
    })
  }

  render() {


    const { query,showingBooks } = this.state    
    const bookShelfs = ["currentlyReading","wantToRead","read","none"]

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

          <div className="list-books-content">
          {bookShelfs.map((bookShelf) => (
          <div key={bookShelf} className="bookshelf">
            <h2 className="bookshelf-title">{bookShelf}</h2>
            <ListBooks
              books={this.state.showingBooks}
              bookShelfName={bookShelf}
              onChangeShelf={this.onChangeShelf}
            />
          </div>
          ))}

          {(() => {
            return this.state.isNoResult ? <div>no result found</div> : null;
          })()}
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks