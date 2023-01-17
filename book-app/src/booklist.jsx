import React from 'react';

import {Link, useNavigate} from 'react-router-dom';
import { BookService } from './bookservice';


function priceStyle(price){
    let color=price<12 ? 'red' : price>14 ? 'green' : 'black';
    return {color};
}

function priceClass(price){
    if (price<12) return 'tooSmall';
    if (price>14) return 'ratherBig';
    return '';
}

const BookRow=({book,navigate}) => <tr>
    <td><Link to={`/book/${book.id}`}>{book.id}</Link></td>
    <td onClick={() => navigate(`/book/${book.id}`)}  style={{cursor:'pointer'}}>{book.title}</td>
    <td>{book.author}</td>
    <td style={priceStyle(book.price)} className={priceClass(book.price)}>{book.price}</td>
    <td>{book.published.toLocaleString()}</td>
</tr>

export class BookListOrig extends React.Component{
    constructor(props){
        super(props);
        this.state={books:[],titleFilter:'',authorFilter:'',sortOrder:'title'};
    }

    componentDidMount(){
        BookService.getAll().then(books => this.setState({books}));
    }

    valueChanged(ev){
        this.setState({[ev.target.id]:ev.target.value});
    }

    render(){
        let {titleFilter:tf,authorFilter:af,sortOrder:so}=this.state;
        let filtered=this.state.books.filter(b => b.title.toUpperCase().includes(tf.toUpperCase()) &&
                                     b.author.toUpperCase().includes(af.toUpperCase()));
        filtered.sort((a,b) => a[so].localeCompare(b[so]));
        let rows=filtered.map(b => <BookRow navigate={this.props.navigate} book={b} key={b.id} />);
        return <div>
            <h2>Kirjat</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th><select id="sortOrder" onChange={ev => this.valueChanged(ev)} value={so}>
                            <option value="title">Title</option>
                            <option value="author">Author</option>
                            </select></th>
                        <th><input id="titleFilter" value={tf} onChange={ev => this.valueChanged(ev)} placeholder="Title" /></th>
                        <th><input id="authorFilter" value={af} onChange={ev => this.valueChanged(ev)} placeholder="Author" /></th>
                        <th>Price</th>
                        <th>Published</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    }
}

export function BookList(){
    return <BookListOrig navigate={useNavigate()} />
}