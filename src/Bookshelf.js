import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'


class Bookshelf extends Component {

    static propTypes = {
        list: PropTypes.array.isRequired,
        onMoveBook: PropTypes.func.isRequired,
        shelf: PropTypes.string.isRequired

    }


    mapShelves = (value) => {

        if(value === 'currentlyReading') return 'Currently reading';
        if(value === 'wantToRead') return 'Want to read';
        if(value === 'read') return 'Read';
        if(value === 'none') return 'none';
    }

    render() {

        let books = this.props.list;
        const shelf = this.props.shelf;
        const onMoveBook = this.props.onMoveBook;
        books = books.filter((book) => book.shelf === shelf);


        return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.mapShelves(shelf)}</h2>
          <div className="bookshelf-books">
             { books.length === 0 ? (

                    <h3 className="bookshelf-status">Empty Shelf</h3>
             ) : (
                    <ol className="books-grid">
                      {
                        books.map( (book) => (
                        <li key={book.id}>
                            <Book
                                book={book}
                                onMoveBook={onMoveBook}
                                shelf={book.shelf}
                            />
                        </li>
                        ))

                      }
                     </ol>
                 )
             }
          </div>
      </div> /*bookshelf*/

        )
    }



}

export default Bookshelf
