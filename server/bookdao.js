module.exports={
	books:[
		{id:1,title:"Odysseia",author:"Homeros",description:"Long way back",price:12.30,published:new Date(22,2,4)},
		{id:2,title:"Hobbit",author:"Tolkien",description:"There and back",price:11.20,published:new Date(37,1,3)},
		{id:3,title:"Two towers",author:"Tolkien",description:"Some balls?",price:13.40,published:new Date(54,9,6)},
		{id:4,title:"Player piano",author:"Vonnegut",description:"Engineers for-ever",price:14.90,published:new Date(52,8,1)},
	],

	getAll(){
		return this.books;
	},
	get(id){
		let book=this.books.find(b => b.id==id);
		return book;
	},
	create(book){
		let maxId=this.books.reduce((a,b) => a.id>b.id ? a : b, {id:0}).id;
		book.id=maxId+1;
		this.books.push(book);
		return book;
	},
	update(book){
		let b=this.get(book.id);
		if (!b) return;
		Object.assign(b,book);
		return b;
	},
	delete(id){
		let index=this.books.findIndex(b => b.id==id);
		if (index<0) return ;
		this.books.splice(index,1);
		return true;
	}
	
	
}