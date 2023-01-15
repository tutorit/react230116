import {FileContent,FileContentRef} from "./demo.filecontent";
import React from 'react';

/* Traditional event-handler function */
function eventHandler(ev){
	alert("Event from "+ev.target.id);
}

/* Simple demo, click-event is processed by eventHandler */
export const SimpleEventDemo = () => <p id="SimpleDemo" onClick={eventHandler}>
		Click me</p>

/* Parent may pass event-handler through props */
export const HandlerFromProps = (props) => <p id="PropsDemo" onClick={props.handler}>
	Click me</p>

/* Clickable itself processes a click-event of the first paragraph.
   In the constructor you need to call bind for all event-handlers
   since otherwise this would refer to the html-element causing the
   event.
   Clickable also uses HandlerFromProps passing the clicked-handler
   and eventHandler through props
*/
export class Clickable extends React.Component{
	constructor(props){
		super(props);
		this.state={clicks:0,something:'else'};
		this.clicked=this.clicked.bind(this);
	}

	clicked(){
		/* Consider setState to work as assing, replace
		   properties of state-object from the object 
		   passed in as parameter */
		this.setState({clicks:this.state.clicks+1});
	}
	
	render(){
		return <div>
			<h3>Clickable</h3>
			<p onClick={this.clicked}>Click me, clicks={this.state.clicks}</p>
			<p>Passing handler to the child</p>
			<HandlerFromProps handler={this.clicked} />
			<p>Or</p>
			<HandlerFromProps id="PropsHandler" handler={eventHandler} />
		</div> 
	}


}
