
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