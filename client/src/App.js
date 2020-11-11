import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/app.css'

import HomePage from './Pages/HomePage.jsx';
import GraphPage from './Pages/GraphPage.jsx';

class App extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Router> 
        <Switch>
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/' component={HomePage} />
          <Route exact path='/graph' component={() => <GraphPage />} />
        </Switch>
      </Router> 
    );
  }
}

export default App;