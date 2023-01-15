import React from 'react';
import {Route,Link,Routes} from 'react-router-dom';
import {HashRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {carStore} from './demo.simplerdx';


import {BootstrapContent,ElementContent,FactoryContent,
    ClassesContent,ClickableContent,CollectionsContent,
    FormsContent,StylesContent, RoutingContent, ChildRoutingContent,
    ReduxContent,ReactReduxContent,
    FileContentContent,AjaxContent
    } from './demo.content';


export const RouterLinks = () => <nav className="demo-nav">
    <Link to={'/'} >Bootstrapping</Link>
    <Link to={'/elements'}>Elements</Link>
    <Link to={'/factory'}>Factories</Link>
    <Link to={'/classes'}>Components</Link>
    <Link to={'/clickable'}>State and events</Link>
    <Link to={'/collections'}>Collections</Link>
    <Link to={'/forms'}>Forms</Link>
    <Link to={'/styles'}>Styles</Link>
    <Link to={'/routing/extra'}>Routing</Link>
    <Link to={'/childrouting/1'}>Child-routing</Link>
    <Link to={'/redux'}>Redux</Link>
    <Link to={'/reactredux'}>ReactRedux</Link>
    <Link to={'/filecontent'}>FileContent</Link>
    <Link to={'/ajax'}>Ajax</Link>
</nav>

export const RouterComponent = () => <Routes>
    <Route exact path="/" element={<BootstrapContent />} />
    <Route path="/elements" element={<ElementContent />} />
    <Route path="/factory" element={<FactoryContent />} />
    <Route path="/classes" element={<ClassesContent />} />
    <Route path="/clickable" element={<ClickableContent />} />
    <Route path="/collections" element={<CollectionsContent />} />
    <Route path="/forms" element={<FormsContent />} />
    <Route path="/routing/:param" element={<RoutingContent />} />
    <Route path="/childrouting/:id/*" element={<ChildRoutingContent />} />
    <Route path="/styles" element={<StylesContent />} />
    <Route path="/redux" element={<ReduxContent />} />
    <Route path="/reactredux" element={<ReactReduxContent />} />
    <Route path="/filecontent" element={<FileContentContent />} />
    <Route path="/ajax" element={<AjaxContent />} />
</Routes>

export const MainContent = () => <Router><div>
	<header>
		<img src="/images/demoicon.jpg" />
		<h1>Demonstrations</h1>
	</header>
	<RouterLinks />
	<main>
		<RouterComponent />
	</main>
	<footer>
		Demonstrations for the course
	</footer>
</div></Router>
// End MainContent

