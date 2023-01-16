import ReactDOM from 'react-dom/client';
import React from 'react';

import {Calculator} from './calculator';

window.onload=function(){
	const root = ReactDOM.createRoot(document.getElementById('appcontent'));
	root.render(
		<React.StrictMode>
		  <Calculator fig1={1}  />
		</React.StrictMode>
	  );
	  
}

