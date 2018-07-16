import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader'
import App from './containers/index';
import { BrowserRouter as Router } from "react-router-dom";
require('./style/util')

const renderApp = App => {
	render(
		<AppContainer>
			<Router><App/></Router>
		</AppContainer>,
		document.getElementById("app")
	);
};

renderApp(App);

if (module.hot) {
      module.hot.accept(() => renderApp(App));
}