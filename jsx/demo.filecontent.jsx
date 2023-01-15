import React from 'react';
import {getHtml} from './demo.ajaxhelpers'

/*  TWO VERSIONS OF THE SAME
	Both components load the file givent by url-prop and display it.
*/

/* Version that uses "dangerouslySetInnerHTML" */
export class FileContent extends React.Component{
	constructor(props){
		super(props);
		this.state={data:{__html:'<p>No data yet</p>'}}
	}
	
	componentDidMount(){
		var self=this;
		getHtml(this.props.url,function(data){
			self.setState({data:{__html:data}});
		});
	}
	
	render(){
		return <div className="filecontent" dangerouslySetInnerHTML={this.state.data} />
	}
}

/* Version that uses ref */
export class FileContentRef extends React.Component{
	constructor(props){
		super(props);
	}
	
	componentDidMount(){
		var self=this;
		getHtml(this.props.url,function(data){
			self.refer.innerHTML=data;
		});
	}
	
	render(){
		var self=this;
		return <div className="filecontent" ref={function(r){ self.refer=r;}}>
				No data yet
			</div>
	}
}