import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./hello";


window.onload=function(){
	ReactDOM.render(
		<Hello name="world" greeting="Typescript is type-safe" />,
		document.getElementById("appcontent")
	);

}