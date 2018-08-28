import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './App.css'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {


    componentWillMount() {

        BooksAPI.getAll().then( (books) => this.setState({bookList:books}) )


    }


    state = {

        bookList : [],

    }

    moveBook = (book,toShelf) => {

         this.setState( (state) => ( {
            bookList : state.bookList.map((b) => {
                    if (b.title === book.title) {
                         b.shelf = toShelf;
                    }
                    return b;
                })

         }))

         BooksAPI.update(book,toShelf)
         .then( (JSONObject) => console.log(JSONObject) )
         .catch( (error) => console.log('Could not update book to proper shelf:',error) )
    }

    addBook = (book,toShelf) => {


        this.addBookToShelf(book,toShelf)


        BooksAPI.update(book,toShelf)
        .then(JSONObject => console.log(JSONObject))
        .catch( (error) => console.log('Could not update book to proper shelf:',error))

    }

    addBookToShelf = (book,toShelf) => {

        // if book exits, just change shelf
        if(this.state.bookList.find((b) => b.id === book.id)) {
            console.log('the book already exists');
            this.moveBook(book,toShelf);
        } else {
            // book doesn't exist in library
            const tempArray = [...this.state.bookList];
            book.shelf = toShelf;
            tempArray.push(book);
            this.setState( { bookList: tempArray})
        }



    }

    render() {
        return (
            <div className="app">

                <Route path="/search" render={ () =>(

                    <SearchBooks
                        onMoveBook={this.addBook}
                        list={this.state.bookList}

                    />

                )}
                />

                <Route exact path="/"  render={ () => (

                    <div className="list-books">
                      <div className="list-books-title">
                        <h1>MyReads</h1>
                      </div>
                      <div className="list-books-content">
                        <div>
                          <Bookshelf
                              onMoveBook={this.moveBook}
                              shelf={'currentlyReading'}
                              list={this.state.bookList}
                          />

                          <Bookshelf
                              onMoveBook={this.moveBook}
                              shelf={'wantToRead'}
                              list={this.state.bookList}
                          />

                          <Bookshelf
                              onMoveBook={this.moveBook}
                              shelf={'read'}
                              list={this.state.bookList}
                          />
                        </div>
                      </div>
                      <div className="open-search">
                        <Link to="/search">Add a book</Link>
                      </div>
                    </div>
                )}/>


            </div>

        )
    }
}

export default BooksApp
