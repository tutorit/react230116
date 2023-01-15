import React from 'react';

import {createStore} from 'redux';

/* The initial data-model */
var initialState={
	carSort:'make',
	cars:[
		{id:1,make:'Volvo',model:'C30'},
		{id:2,make:'Audi',model:'Q3'},
		{id:3,make:'Toyota',model:'Auris'}
	]
};

/* Provide function(s) to create an action(s) */
export function changeSort(sort){
	return{
		type:"CHANGE_SORT",
		data:sort
	};
}


/* Implement a reducer capable of handling an action */
export function carReducer(previousState,action){
	if (!previousState) return initialState;
	if (action.type=="CHANGE_SORT"){
		var field=action.data;
		return {
			carSort:field,
			cars:previousState.cars.sort((a,b) => a[field].localeCompare(b[field]))
		};
	}
	return previousState;
}

/* Create the store */
export var carStore=createStore(carReducer);

/* You may also create action-functions doing dispatch automatically */
export const dispatchChangeSort = (sort) => carStore.dispatch(changeSort(sort));

export class ReduxList extends React.Component{
	constructor(props){
		super(props);
		this.state={cars:carStore.getState().cars};
	}

	componentDidMount(){
		this.unsubscribe=carStore.subscribe(() => this.forceUpdate());
	}

	componentWillUnmount(){
		this.unsubscribe();
	}

	render(){
		var cars=carStore.getState().cars.map(c => <li key={c.id}>{c.make} {c.model}</li>)
		return <div>
			<p>Sort:
				<span onClick={() => dispatchChangeSort('make')}>Make </span>
				<span onClick={() => dispatchChangeSort('model')}>Model </span>
			</p>
			<ul>{cars}</ul>
		</div>
	}
}
