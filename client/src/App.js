import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NoMatch from './components/NoMatch';
import Home from './components/Home';
import './styles/App.scss';
import Department from './components/Department';
import Cart from './components/Cart';

const App = () => (
  <>
    
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/departments/:id/products" component={Department}/>
      <Route exact path="/cart" component={Cart}/>
      <Route component={NoMatch}/>
    </Switch>
  </>
)

export default App;

