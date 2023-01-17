import React, { useEffect,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookService } from './bookservice';


export function BookDetail(props){
    const navigate=useNavigate();
    const params=useParams();

    let [id,changeId]=useState(0);
    let [title,changeTitle]=useState('Ei vielä asetettu');
    let [author,changeAuthor]=useState('Ei vielä asetettu');

    useEffect(() => {
        if (params.id==id) return;
        changeId(params.id);
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