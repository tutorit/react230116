import React from 'react';
 
/* Sample generic helper for ajax using the traditional XMLHttpRequest */
export function doAjax(url,method,data=null) {
	return new Promise(function(resolve,reject){
		var xr=new XMLHttpRequest();
		xr.onreadystatechange=function(){
			if(xr.readyState==4){
				if((xr.status>=200)&&(xr.status<300)){
					try{
						var obj=JSON.parse(xr.responseText);
						resolve(obj,xr);
					}
					catch(e){
						resolve(xr);
					}
				}
				else reject(xr);
			}
		}
		xr.open(method,url,true);
		xr.setRequestHeader("Content-Type","application/json");
		xr.setRequestHeader("Accept","application/json");
		xr.send(data && JSON.stringify(data));
	});
}

/* Object providing the basic CRUD */
const HTTP={
	get: (url) => doAjax(url,'get'),
	delete: (url) => doAjax(url,'delete'),
	put: (url,data) => doAjax(url,'put',data),
	post: (url,data) => doAjax(url,'post',data)
};


export class AjaxDemo extends React.Component{
	constructor(props){
		super(props);
		this.state={data:'No data yet'};
		this.processResponse=this.processResponse.bind(this);
	}

	processResponse(data){
		this.setState({data:JSON.stringify(data)});
	}

	render(){
		return <div>
			<input type="button" value="Get" 
				onClick={() => HTTP.get('/api/demo/1')
					.then(d => this.processResponse(d))} />
			<input type="button" value="Post" 
				onClick={() => HTTP.post('/api/demo',{data:{greeting:'Nice',target:'day'}})
					.then(d => this.processResponse(d))} />
			<input type="button" value="Put" 
				onClick={() => HTTP.put('/api/demo/1',{greeting:'Nice',target:'day'})
					.then(d => this.processResponse(d)) } />
			<input type="button" value="Delete" 
				onClick={() => HTTP.delete('/api/demo/1')
					.then(d => this.processResponse(d))} />
			<p>Data from server: {this.state.data}</p>
		</div>
	}

}



/* This is used by the demo app to load html from the server */

export function getHtml(url,cb){
	var xr=new XMLHttpRequest();
	xr.onreadystatechange=function(){
		if(xr.readyState==4){
			if((xr.status>=200)&&(xr.status<300)){
				cb(xr.responseText);
			}
			else console.log("Could not get",url);
		}
	}
	xr.open("get",'/demo/'+url,true);
	xr.send();
}

/*
Or if you have jQuery loaded:

export function getHtml(url,cb){
	$.ajax({type : 'GET', url : '/demo/'+url, dataType : 'html',
		success : function(data){
			cb(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(textStatus);
		}
	});
}
*/