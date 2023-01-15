import ReactDOM from 'react-dom/client';
import React from 'react';

window.onload=function(){
	const root = ReactDOM.createRoot(document.getElementById('appcontent'));
	root.render(
		<React.StrictMode>
		  <p>Hello</p>
		</React.StrictMode>
	  );
	  
}

