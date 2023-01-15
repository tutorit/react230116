import React from 'react';
import PropTypes from 'prop-types';

/* The simplest component described as class inheriting React.Component */
export class Class3 extends React.Component{
	constructor(props){
		super(props);
	}
	
	render(){
		return <p>Hello world!</p>
	}
}

/* This component takes props from the parent and
also uses a child component*/
export class Class4 extends React.Component{
	constructor(props){
		super(props);
	}
	
	render(){
		return <div>
			<p>Parent sends {this.props.data}</p>
			<Class3 />
		</div>
	}
}

/* This component displays the children given by the container */
export class Class5 extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return <div><h2>Some children from parent</h2>
			{this.props.children}</div>
	}
}

export class Class6 extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
        return <div><p>{this.props.value}</p>{this.props.children}</div>
	}
}
Class6.propTypes={
	children: PropTypes.element.isRequired,
	value: PropTypes.string.isRequired
}

/* Just a simple container for previous component */
export const ClassContainer=() => <div>
	<Class4 data="greetings" />
	<Class5>
		<p>Class5 will display this</p>
		<p>...and this</p>
	</Class5>
	<Class6 value="Hello">
		<p>Exactly one child</p>
	</Class6>
</div>
