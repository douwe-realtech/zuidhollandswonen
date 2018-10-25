import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';
import App from './App';
import OpenDag from './OpenDag';
import * as serviceWorker from './serviceWorker';

function Routing() {
	return (
		<Router>
			<div>
			<Route exact path="/" component={App} />
			<Route exact path="/opendag" component={OpenDag} />
			</div>
		</Router>
	);
}

ReactDOM.render(<Routing />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
