



import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Redux from './components/Redux';
import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import {Provider} from "react-redux";


const mathReducer = (state={
        result: 1,
        lastValues: [],
        }, action) => {
     switch(action.type) {
        case "ADD":
                state = {
                   ...state,
                   result: state.result + action.payload,
                   lastValues: [...state.lastValues, action.payload]             
                }
                break;
        case "SUBSTRACT":    
                state = {
                ...state,
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload]                      
             }
             
                break;
     }
     return state;
}
const userReducer = (state={
        name: "Max",
        age: 27
        }, action) => {
     switch(action.type) {
        case "SET_NAME":
                state = {
                   ...state,
                        name: action.payload
                }
                break;
        case "SET_AGE":
        state = {
                ...state,
                age: action.payload                      
             }
             
                break;
     }
     return state;
}
const myLogger = (store) => (next) => (action) => {
        console.log('Logged Action: ', action);
        next(action);
}

const store = createStore(combineReducers({mathReducer, userReducer}),
                {},
                 applyMiddleware(logger)
                );

store.subscribe(() => {
      //  console.log("store updated", store.getState());
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
