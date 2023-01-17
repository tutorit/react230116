import ReactDOM from 'react-dom/client';
import React from 'react';

import {CalculatorContainer} from './calculator';

window.onload=function(){
	const root = ReactDOM.createRoot(document.getElementById('appcontent'));
	root.render(
		<React.StrictMode>
		  <CalculatorContainer  />
		</React.StrictMode>
	  );
	  
}

