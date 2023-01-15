import React from 'react';

const colorProps={style:{color:'red'}};
const borderProps={style:{border:'1px solid black'}};
const eventProps={
	onClick:function(ev){
		alert("Element was clicked");
	},
	style: {cursor:'pointer'}
};
export const element1=React.createElement("p",null,"Element with createElement");
export const element2=React.createElement("p",colorProps,"Simple element with props");
export const element3=React.createElement("div",borderProps,
							React.createElement("p",colorProps,"p is child of div"));
export const element4=React.createElement("p",eventProps,"I am clickable");							

export const element5=React.createElement("div",borderProps,
							element2,element4)
							
export const element6=<p>This is the simplest element with JSX</p>

export const element7=<div>
	<p>Just form a hierachical struct</p>
	<p>With <b>one root-element</b></p>
</div>

export const element8=<p style={{color:'red'}}>Typical use of props in JSX</p>

export const element9=<p {...eventProps}>But props-object can also be used</p>

export const element10=(
	<div>
		<p>This is a child</p>
		{element2}
		{element8}
	</div>
)

