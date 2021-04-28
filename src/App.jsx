import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './views/Home/index'
import 'antd/dist/antd.css'

const App = (props) => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path={'/'} component={Home} />
			</Switch>
		</BrowserRouter>
	)
}

export default App
