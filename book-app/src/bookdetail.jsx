import React, { useEffect,useState } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { BookServiceHttp as BookService } from './bookservice';


export function BookDetail(props){
    const navigate=useNavigate();
    const params=useParams();

    let [id,changeId]=useState(0);
    let [title,changeTitle]=useState('Ei vielä asetettu');
    let [author,changeAuthor]=useState('Ei vielä asetettu');

    useEffect(() => {
        if (params.id==id) return;
        changeId(params.id);
        console.log("Jep")
        BookService.get(params.id).then(book => {
            console.log("Haettu");
            changeTitle(book.title);
            changeAuthor(book.author);
        })
    },[id]);

    function back(){
        let book={id,title,author};
        BookService.save(book).then(() => {
            navigate(-1);
        })
    }

    return <div>
        <h2>Kirja ({params.id})</h2>
        <div>
            <label>Title</label>
            <input value={title} onChange={ev => changeTitle(ev.target.value)} />
        </div>
        <div>
            <label>Author</label>
            <input value={author} onChange={ev => changeAuthor(ev.target.value)} />
        </div>
        <input type="button" value="Takaisin" onClick={() => back()} />
    </div>
}


function PrintableDetail({book}){

    return <div>
        <h2>Printable</h2>
        <p>{JSON.stringify(book)}</p>
    </div>
}

export function DetailContainer(){
    let [book,changeBook]=useState({book:{id:-1,title:'Not yet'}});
    let [id,changeId]=useState(0);
    const params=useParams();

    useEffect(() => {
        if (book.id==id) return;
        changeId(params.id);
        BookService.get(params.id).then(b => {
            changeBook(b);
        })
    },[id]);

    return <div>
        <h2>{book.title}</h2>
        <div className="bookNavi">
            <Link to="">Editoitava</Link>
            <Link to="printable">Printattava</Link>
        </div>
        <Routes>
            <Route path="" element={<BookDetail />} />
            <Route path="printable" element={<PrintableDetail book={book} />} /> 
        </Routes>
    </div>
}