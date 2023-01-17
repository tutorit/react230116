import { createStore } from "redux";



export function bookReducer(prev,action){
    if (!prev) return {books:[],sort:'title'};

    if (action.type=='CHANGE_SORT'){
        return Object.assign({},prev,{sort:action.data});
    }

    if (action.type=='GOT_BOOKS'){
        return Object.assign({},prev,{books:action.data})
    }

    return prev;
}

export const bookStore=createStore(bookReducer);