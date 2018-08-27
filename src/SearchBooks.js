import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {




    state = {
        query: '',
        books: []
    }


    updateQuery = (query) => {

        this.setState({query: query})
        if(query) {
            BooksAPI.search(query.trim())
                .then((response) => {
                     // console.log(response);
                    // if there is at least one match, response is an array
                    if (Array.isArray(response)) {
                        this.setState({ books: response })
                    } else { // else, response is an error object (error:, items:[])
                        console.log(response.error);
                        this.setState({ books: response.items })
                    }
                })
                .catch( (error) => {
                    console.log('error caught',error);
                })


        } else {
            this.setState({ books: [] })

        }
    }





    findShelfValue = (bookList,book) => {


        const foundBook = bookList.find( (b) => b.id ==book.id);
        return foundBook ? foundBook.shelf: 'none';
    }

    render() {

        let bookList = this.props.list;
        const onMoveBook = this.props.onMoveBook;
        // console.log(bookList);

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
                        <Book
                            book={book}
                            onMoveBook={onMoveBook}
                            shelf={this.findShelfValue(bookList,book)}
                        />
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
