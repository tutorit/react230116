import { HTTP } from "./ajaxhelpers";
import { bookStore } from "./bookstore";

export const BookService={

    books:[
        {id:1,title:"Odysseia",author:"Homeros",description:"Long way back",price:12.30,published:new Date(22,2,4)},
        {id:2,title:"Hobbit",author:"Tolkien",description:"There and back",price:11.20,published:new Date(37,1,3)},
        {id:3,title:"Two towers",author:"Tolkien",description:"Some balls?",price:13.40,published:new Date(54,9,6)},
        {id:4,title:"Player piano",author:"Vonnegut",description:"Engineers for-ever",price:14.90,published:new Date(52,8,1)},
    ],

    getAll(){
        return new Promise((resolve) => {

            resolve(this.books);
        });
    },

    get(id){
        return new Promise((resolve) => {
            let book=this.books.find(b => b.id==id);
            if (!book) book={id:0,title:'Ei',author:'löydy'};
            resolve(book);
        });
    },

    save(book){
        return new Promise((resolve) => {
            let existing=this.books.find(b => b.id==book.id);
            Object.assign(existing,book);
            resolve(existing);
        });
    }

};

export const BookServiceHttp={
    books:[],

    testBook(book){
        if (typeof(book.published=='string')) book.published=new Date(book.published);
        let existing=this.books.find(b => b.id==book.id);
        if (!existing) this.books.push(book);
        else Object.assign(existing,book);
    },

    getAll(){
        return new Promise(resolve => {
            HTTP.get("/api/books").then(books => {
                books.forEach(book => this.testBook(book));
                resolve(this.books);
                bookStore.dispatch({type:'GOT_BOOKS',data:this.books})
            })
        });
    },

    get(id){
        return new Promise(resolve => {
            HTTP.get("/api/books/"+id).then(book => {
                this.testBook(book);
                resolve(book);
            });
        });
    },

    save(book){
        return new Promise(resolve => {
            HTTP.put("/api/books/"+book.id,book).then(b => {
                this.testBook(b);
                resolve(b);
            })
        })
    }
};