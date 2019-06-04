import React, {useState, useReducer} from 'react';

import {useTransition, animated, config} from 'react-spring';

import CardFront from './components/cardOne/CardFront';
import CardRear from './components/cardOne/CardRear';
import Form from './components/form';

import style from './app.module.scss';

const App = () => {
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        github: '',
        twitter: ''
    };

    const reducer = (state, action) => {
        switch(action.type) {
            case 'first':
                return {...state, firstName: action.payload};
            case 'last':
                return {...state, lastName: action.payload};
            case 'email':
                return {...state, email: action.payload};
            case 'github':
                return {...state, github: action.payload};
            case 'twitter':
                return {...state, twitter: action.payload};
            default:
                throw Error('Unknown event occurred')
        }
    };

    const [side, Flip] = useState(1);
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className={style.container}>        
        {
            side 
                ? <div className={[style.card, style.centered].join(" ")}>
                    <button 
                        onClick={() => Flip(side ? 0 : 1)}
                        className={style.button}
                    >
                        See {side ? 'rear' : 'front'}
                    </button>
                    <CardFront state={state}/>
                </div>
                : <div className={[style.card, style.centered].join(" ")}>
                    <button 
                        onClick={() => Flip(side ? 0 : 1)}
                        className={style.button}
                    >
                        See {side ? 'rear' : 'front'}
                    </button>
                    <CardRear />
                </div>
        }
        <div className={[style.panel, style.centered].join(" ")}>
            <Form state={state} dispatch={dispatch}/>
        </div>
    </div>
    );
};

export default App;