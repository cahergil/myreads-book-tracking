import React, { Component } from 'react';


class Bookshelf extends Component {

    mapShelfToOption = (name) => {

        if(name === 'Currently reading') return 'currentlyReading';
        if(name === 'Want to read') return 'wantToRead';
        if(name === 'Read') return 'read';
        if(name === 'none') return 'none';

    };





    render() {

         let books = this.props.list;
         const shelf = this.props.shelf;
         const onMoveBook = this.props.onMoveBook;

         books = books.filter((book) =>book.shelf === shelf);

        return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelf}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
             { books.map( (book) => (
                     <li key={book.title}>
                       <div className="book">
                         <div className="book-top">
                           <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.cover})` }}></div>
                           <div className="book-shelf-changer">
                             <select onChange={(e) => onMoveBook(book,e.target.value) } value={this.mapShelfToOption(shelf) } >
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
                 )
             )
             }



            </ol>
          </div>
        </div>

        )
    }



}

export default Bookshelf
