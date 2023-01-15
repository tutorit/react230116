import React from 'react';
import {Clickable, SimpleEventDemo} from './demo.clickable';
import {FileContent} from './demo.filecontent';
import {ComponentContainer} from './demo.factories';
import {ClassContainer} from './demo.classes';
import {CarList} from './demo.collections';
import {FormsDemo} from './demo.forms';
import {StylesDemo} from './demo.styles';
import {ReduxList} from './demo.simplerdx';
import {ReduxDemo} from './demo.redux';
import {ChildRouting} from './demo.childrouting';
import {AjaxDemo} from './demo.ajaxhelpers';

import * as elements from './demo.elements';
import { useMatch, useParams } from 'react-router';

export const BootstrapContent = () => <div>
	<h1>Bootstrapping</h1>
	<div className="row">
		<div className="col-md-6">
			<h2>Minimum set of modules</h2>
			<p>We assume you use jQuery, so it needs to be loaded.</p>
			<p>Also react and react-dom modules are needed. As you npm install
				those a few pa ckaging options are provided:</p>
			<ul>
				<li>CommonJS and UMD</li>
				<li>Development and production</li>
			</ul>
			<p>We will be using UMD-development packaging. For example
				node_modules/react/umd/react.development.js is copied
				into wwwroot/lib/react/react.js. This is done for you by
				course-utils npm-package that creates the course environment.</p>
			<h2>ReactDOM.render</h2>
			<p>ReactDOM.render renders the given React-element into
				the dom-tree as contents of selected dom-element</p>
			<p>As the launcher you often implement document-ready
				handler and use ReactDOM.render there.</p>
		</div>
		<div className="col-md-6">
			<h2>Your script</h2>
			<FileContent url="jsx/demo.launcher.jsx" />
			<h2>Html-page</h2>
			<div className="filecontent">
				&lt;div id="hello">Disappearing...&lt;div>
			</div>
		</div>
	</div>
</div>
// End BootstrapContent

const outputProps={
	style:{
		border: '1px solid silver',
		padding: '5px'
	}
}

/* Helper for the actual content pages */
const ContentElement = ({title,url,children}) => <div>
	<h1>{title}</h1>
	<div className="row">
		<div className="col-md-4">
			{children}
		</div>
		<div className="col-md-8">
			<h2>{url}</h2>
			<FileContent url={url} />
		</div>
	</div>
</div>

export const ClickableContent= (props) => <ContentElement title="State and events" url="jsx/demo.clickable.jsx">
	<h2>Events</h2>
	<p>Event handling pretty much follows the standards of 
		dom-event event handling. You define handlers for the
		react-elements as you would in html-attributes. just
		remember to use camel-casing (onClick, onBlur etc).</p>
	<p>SimpleEventDemo:</p>
	<div {...outputProps}><SimpleEventDemo /></div>
	<p>Clickable component demonstrates event handling implemented
		into a Component-class and also passing event handler to a 
		child.</p>		
	<Clickable />
	<h2>State</h2>
	<p>Component instance may have state-property: a JavaScript-object
		"remembering" items between renderings.</p>
	<p>The state is initialized in the constructor, event handler often
		modify the state. Changing the state causes rerendering of the
		component instance.</p>
</ContentElement>

export const FactoryContent=() => <ContentElement title="Factories" url="jsx/demo.factories.jsx">
	<h2>Factory-functions</h2>
	<p>Factory-functions may be used to produce react-elements.
		Just implement a function that takes props-object as parameter
		and returns react-element describing content for that element.
	</p>
	<p>ES6 offers quite a few variations on this theme.</p>
	<p>Below is the output for the ComponentContainer discribed towards
	the bottom of the file:</p>
	<div {...outputProps}><ComponentContainer /></div>
</ContentElement>

export const ClassesContent=() => <ContentElement title="Components" url="jsx/demo.classes.jsx">
	<h3>ES6 classes</h3>
	<p>For components that hold more complicated UI-logic an ES6-class
		should be created.</p>
	<p>The class should hold at minimum the constructor that passes
		the props (and possibly other parameters) to the Component-
		constructor and also render-method that returns the react-element
		that is rendered to the dom.</p>
	<p>ClassContainer is rendered below</p>
	<div {...outputProps}><ClassContainer /></div>
</ContentElement>


export const ElementContent=() => <ContentElement title="Elements" url="jsx/demo.elements.jsx">
	<h2>Use of createElement</h2>
	<p>A very simple element1:</p>
	<div {...outputProps}>{elements.element1}</div>
	<p>Props-object is given to element2</p>
	<div {...outputProps}>{elements.element2}</div>
	<p>Element has a child in element3:</p>
	<div {...outputProps}>{elements.element3}</div>
	<p>Props may also contain event-handlers as demonstrated in element4:</p>
	<div {...outputProps}>{elements.element4}</div>
	<p>Any number of children may be given. They are just react-elements.
	element5 holds two children:</p>
	<div {...outputProps}>{elements.element5}</div>
	<h3>Using JSX</h3>
	<p>JSX just removes the need of createElement:</p>
	<div {...outputProps}>{elements.element6}</div>
	<p>We kind of just write html to describe the element:</p>
	<div {...outputProps}>{elements.element7}</div>
	<p>In this notation the props are typically passed in as attributes</p>
	<div {...outputProps}>{elements.element8}</div>
	<p>But the "spread-operator" may be used to pass in an entire object. element9:</p>
	<div {...outputProps}>{elements.element9}</div>
	<p>And of course we can also use existing elements as demonstrated in element10</p>
	<div {...outputProps}>{elements.element10}</div>
	<p>Also notice the use of brackets () surrounding the mark-up. A good practise
		is to use the brackets at least for multiline mark-ups. They are not absolutely
		necessary if the mark-up starts on the same line as assignment operator (element7)
		or otherwise continues the JavaScript statement.</p>
</ContentElement>

export const CollectionsContent = () => <ContentElement title="Collections" url="jsx/demo.collections.jsx">
	<h2>Mapping array</h2>
	<p>Standard JavaScript Array.map may be used to map
		contents of a data-array into an array of react-elements</p>
	<CarList />
</ContentElement>

export const FormsContent = () => <ContentElement title="Forms" url="jsx/demo.forms.jsx">
	<h2>change-event</h2>
	<FormsDemo />
</ContentElement>

export const RoutingContent = () => {
	let params=useParams();
	return <ContentElement title="Router" url="jsx/demo.routing.jsx">
		<h2>Router-module</h2>
		<p>React-router module gives you the HashRouter and BrowserRouter elements.
			Depending on your navigation style one of these appears as the topmost
			element of your virtual dom.</p>
		<p>On suitable location on your page (contents of main) you then have
			Switch-element to whom you describe which component should be shown 
			based on the url-pattern.</p>
		<p>Instead of using a-hrefs to navigate you should use Link-element. It
			handles the different navigation styles correctly.</p>
		<p>Component that is displayed by the router gets a match-prop describing
			route information. Below is the JSON-representation of match-prop for
			this component:</p>
		<pre>{JSON.stringify(params).split(",").join(",\r\n")}</pre>
	</ContentElement>
}

export const ChildRoutingContent  = (props) => <ContentElement title="Child routing" url="jsx/demo.childrouting.jsx">
	<h2>Using match</h2>
	<p>Match prop holds the url of the route the component is currently processing
	    and also the possible route params.</p>
	<ChildRouting {...props} />
</ContentElement>

export const StylesContent = () => <ContentElement title="Styles" url="jsx/demo.styles.jsx">
	<h2>Styles</h2>
	<p>Of course most of the styles for the solutions should 
		be declared traditionally to separate css-files. How-ever
		the style-prop accepts an object that is controlled by the
		component and that gives us control of the styles used.
	</p>
	<p>Always remember to use the camel-casing for the styles instead
		of the actual style-names.
	</p>
	<StylesDemo />
</ContentElement>

export const ReduxContent = () => <ContentElement title="Redux" url="jsx/demo.simplerdx.jsx">
	<h2>Using store</h2>
	<p>When using Redux you just create store(s) that hold state for 
		your application. Each store has a "reducer", a function that
		knows how to process actions that are used to manipulate the 
		state.</p>
	<p>The component may subscribe change-notifications from the store and
		also dispatch actions to the store</p>
	<ReduxList />
</ContentElement>

export const ReactReduxContent = () => <ContentElement title="ReactRedux" url="jsx/demo.redux.jsx">
	<h2>Props</h2>
	<p>With ReactRedux you create state-aware components. Basically you
		implement components that DO NOT rely on their own state but operate
		only on the props. Then you map data from Redux-store to the props
		of your component.</p>
	<p>Also you map the event-handlers of your component to actions directed
		against the store.</p>
	<p>Somewhere in your virtual dom (typically surrounding even Router) 
		you have Provider-element that makes the store available to all 
		its children.</p>
	<ReduxDemo />
</ContentElement>

export const FileContentContent = () => <ContentElement title="FileContent" url="jsx/demo.filecontent.jsx">
	<h2>Setting innerHTML</h2>
	<p>When working with React you should just render react elements into
		virtual dom, manipulating the actual html-elements should be avoided
		to some extent.</p>
	<p>This component demonstrates couple of alternatives on how to dynamically
		change innerHTML of the actual html-element already rendered to the 
		dom.</p>
	<p>Actual html-fragments are loaded from the server at runtime. Therefore
		they are not react-elements that could be rendered. Instead they must
		be placed to innerHTMl of an existing react-element</p>
	<p>This can be accomplished by dangerouslySetInnerHTML-prop (does the names
		suggest that some consideration should be used?) or via ref-prop that
		allows setting a reference to the actual html-element.</p>
</ContentElement>
 
export const AjaxContent = () => <ContentElement title="AjaxHelpers" url="jsx/demo.ajaxhelpers.jsx">
	<h2>Ajax-helpers</h2>
	<p>Some samples for using ajax in case you are not too familiar
		with it.</p>
	<AjaxDemo />
</ContentElement>
