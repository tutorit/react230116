import ReactDOM from 'react-dom/client';
import React from 'react';
import {MainContent} from "./demo.routing";

window.onload=function(){
	const root = ReactDOM.createRoot(document.getElementById('appcontent'));
	root.render(
		<React.StrictMode>
		  <MainContent />
		</React.StrictMode>
	  );
	  
}

