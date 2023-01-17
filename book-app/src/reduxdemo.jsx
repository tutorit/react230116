import React from 'react';
import { connect } from 'react-redux';
import { bookStore } from './bookstore';


export class ReduxDemo extends React.Component{
    constructor(props){
        super(props)
        this.state={redux:{}};
    }

    componentDidMount(){
        this.unsub=bookStore.subscribe(() => {
            this.setState({redux:bookStore.getState()})
        })
    }

    componentWillUnmount(){
        this.unsub();
    }

    render(){
        return <div>
            <h2>Redux</h2>
            <p>{JSON.stringify(this.state.redux)}</p>
        </div>
    }
}

export function ReduxFuncOrig(props){
    return <div>
        <h2>Redux func</h2>
        <p>{JSON.stringify(props)}</p>
    </div>
}

export const ReduxFunc=connect(state => ({sortOrder:state.sort,kirjat:state.books}))(ReduxFuncOrig);

