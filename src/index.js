import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";
import joinReducer from "../src/store/reducers/Join";
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer =  combineReducers({
  Join:joinReducer,
});
const store = createStore(rootReducer ,
    composeEnhancers(
        applyMiddleware(thunk)
    ));

const app=(
   <Provider store={store}>
        <BrowserRouter>
           <App/>
        </BrowserRouter>
   </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
