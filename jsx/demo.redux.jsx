import React from 'react';
import {Provider,connect} from 'react-redux';

import {carStore,changeSort} from './demo.simplerdx';

function ReactReduxCarList({cars,onSortMake,onSortModel}) {
    var elems=cars.map(c => <li key={c.id}>{c.make} {c.model}</li>);
    return <div>
            <p>Sort :
                <span onClick={onSortMake}>Make </span>
                <span onClick={onSortModel}>Model </span>
            </p>
            <ul>{elems}</ul>
        </div>
}

function stateToProps(state,props) {
    return {cars:state.cars,sort:state.carSort};
}

function eventsToActions(dispatch){
    return {
        onSortMake: () =>  dispatch(changeSort('make')),
        onSortModel: () => dispatch(changeSort('model'))
    }
};

const ActualCarList=connect(stateToProps,eventsToActions)(ReactReduxCarList);

export class ReduxDemo extends React.Component{
    constructor(props){
        super(props);
    }
 
    render(){
        return <Provider store={carStore}>
                <ActualCarList test="hello" />
            </Provider>
    }
}