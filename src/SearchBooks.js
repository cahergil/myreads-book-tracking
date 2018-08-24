import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends Component {

    state = {
        query: '',
        books: []
    }

    componentDidMount() {


    }

    updateQuery = (query) => {

        // query !== ''
        if(query) {
            BooksAPI.search(query)
                .then((response) => {
                     console.log(response);
                    // if thre is at least a match, response is an array
                    if (Array.isArray(response)) {
                        this.setState({ books: response, query: query })
                    } else { // else, response is an error object (error:, items:[])
                        console.log(response.error);
                        this.setState({ books: response.items, query: query })
                    }
                })
                .catch( (error) => {
                    console.log('error caught',error);
                })


        } else {
            this.setState({ books: [],query: query })

        }
    }


    render() {
        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input
                    type="text"
                    placeholder="Search by title or author"
                    value = {this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                    />

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                 {

                    this.state.books.map( (book) => (

                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                              <div className="book-shelf-changer">
                                <select >
                                       <option value="move" disabled>Move to...</option>
                                       <option value="currentlyReading" >Currently Reading</option>
                                       <option value="wantToRead" >Want to Read</option>
                                       <option value="read" >Read</option>
                                       <option value="none" >None</option>

                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                    ))
                }
                </ol>
            </div>
            </div>
        )
    }


}

export default SearchBooks
