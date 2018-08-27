import React, { Component } from 'react';


class Book extends Component {




render() {
    const book = this.props.book;
    const onMoveBook = this.props.onMoveBook;
    const shelf = this.props.shelf;
    return (

            <li key={book.title}>
              <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:
                        `url(${book.imageLinks? book.imageLinks.smallThumbnail:''} )` }}></div>
                  <div className="book-shelf-changer">
                    <select id="selector" onChange={(e) => onMoveBook(book,e.target.value) } value={shelf} >
                           <option value="move" disabled>Move to...</option>
                           <option value="currentlyReading">Currently Reading</option>
                           <option value="wantToRead" >Want to Read</option>
                           <option value="read" >Read</option>
                           <option value="none" >None</option>

                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(',') : 'not available'}</div>
              </div>
            </li>
        )
    }


}

export default Book
