import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'
import { Route } from 'react-router-dom'
import Shelfs from './Shelfs'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      books: [],
      showSearchPage: false
    }
  }

  componentDidMount() {
    
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(books)
    })

  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <Shelfs/>
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
