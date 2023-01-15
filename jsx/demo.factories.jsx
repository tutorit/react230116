import React from 'react';

/* Simplest component is just a function that returns react element*/
export function Component1(){
	return <p>This is a very simple component</p>;
}

/* The function may take props-object as parameter.
   The object holds the "attributes" given to the component instance*/
export function Component2(props){
	return <p>This component has props: {props.name}</p>
}

/* Arrow function sample*/
export const Component3 = (props) => <p>Component with {props.data}-function</p>

/* ES6 Object matching notation */
export const Component4 = ({greeting,target}) => <p> {greeting}, {target}</p> 


/* Container for the components above, just described as a function */
export function ComponentContainer(){
	return <div>
			<Component1 />
			<Component2 name="Tom" />
			<Component3 data="arrow" />
			<Component4 greeting="Hello" target="world" />
		</div>
}


