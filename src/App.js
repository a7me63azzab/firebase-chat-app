import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import Join from "./components/Join";
import Chat from "./containers/Chat";
import Header from "./components/Header";
import Layout from "./containers/Layout";
import firebase from "./js/firebase";

class App extends Component {

  render() {
    console.log(firebase.name);
    console.log(firebase.database());
    return (
          <div>
              <Header/>
              <Route exact path="/" component={Layout}/>
              <Route path="/join" component={Join}/>
              <Route path="/chat" component={Chat}/>
          </div>
    );
  }
}

export default App;
