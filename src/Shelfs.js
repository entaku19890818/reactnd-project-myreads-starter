import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'
import { Link } from 'react-router-dom'

class Shelfs extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      books: [],
      showSearchPage: false
    }
  }

  componentDidMount() {
    this.getBooksAll()


  }
  getBooksAll() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(books)
    })

  }



  onChangeShelf = (event) => {
    let bookId = event.currentTarget.getAttribute('data-book-id')
    let shelf = event.target.value

    
    BooksAPI.get(bookId).then((book)=> {
      console.log(book)
      BooksAPI.update(book, shelf).then((res)=> {
        console.log(res)
        this.getBooksAll()
      })
    })

  }

  render() {
    const bookShelfs = ["currentlyReading","wantToRead","read"]

    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            
            </div>
            <div className="list-books-content">
              <div>
              {bookShelfs.map((bookShelf) => (
                  <div key={bookShelf} className="bookshelf">
                    <h2 className="bookshelf-title">{bookShelf}</h2>
                    <ListBooks
                      books={this.state.books}
                      bookShelfName={bookShelf}
                      onChangeShelf={this.onChangeShelf}
                    />
                 </div>
              ))}

              </div>
            </div>
            <div className="open-search">
              <Link to="/search"></Link>
            </div>
          </div>
      </div>
    )
  }
}

export default Shelfs
