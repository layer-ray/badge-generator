import React, {useState, useReducer} from 'react';

import QRCode from 'qrcode';
import {useTransition, animated, config} from 'react-spring';

import CardFront from './components/cardOne/CardFront';
import CardRear from './components/cardOne/CardRear';
import Form from './components/form';

import style from './app.module.scss';

import placeholderImage from '../public/imgs/placeholder.jpg';
import placeholderQR from '../public/imgs/qr_wiki_en.png';

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
                return action.payload === ''
                    ?  {...state, twitter: ''}
                    :  {...state, twitter: '@' + action.payload};
            case 'reset':
                setImageSrc(placeholderImage);
                return initialState;
            default:
                throw Error('Unknown event occurred')
        }
    };

    const [side, flip] = useState(true);
    const [imageSrc, setImageSrc] = useState(placeholderImage);
    const [QRSrc, setQRSrc] = useState(placeholderQR);
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayActiveSide = e => {
        if (['firstName', 'lastName'].includes(e.target.name) && !side
            ||
            ['email', 'github', 'twitter'].includes(e.target.name) && side)
            flip(!side);
    };

    const spin = () => flip(!side);

    const printDoc = () => {
        window.print();
    };

    const loadImage = () => {
        const imgSrc = prompt('insert url');
        setImageSrc(imgSrc);
    }

    const generateQR = e => {
        e.preventDefault();
        const data = JSON.stringify(state);
        QRCode.toDataURL(data)
                .then(QR => {
                    setQRSrc(QR);
                })
                .catch( error => {
                    console.error(error);
                });
    }

    const transitions = useTransition(side, null, {
        initial: { position: 'absolute', opacity: 0, transform: 'rotateY(0deg)' },
        from: { position: 'absolute', opacity: 0, transform: 'rotateY(-180deg)' },
        enter: { opacity: 1, transform: 'rotateY(0deg)' },
        leave: { opacity: 0, transform: 'rotateY(-180deg)' },
        unique: true,
        reset: true,
        config: config.molasses
    });

    return (
        <>
            <div className={style.container}>
                {
                    transitions.map(({ item, key, props }) =>  (
                            item
                            ? <animated.section 
                                key={key} 
                                style={props}
                                className={[style.card, style.centered].join(" ")}
                                >
                                    <CardFront 
                                        state={state} 
                                        spin={spin}
                                        image={imageSrc || image}
                                        load={loadImage}
                                    />
                                </animated.section>
                            : <animated.section 
                                key={key} 
                                    style={props}
                                    className={[style.card, style.centered].join(" ")}
                                >
                                    <CardRear 
                                        state={state} 
                                        spin={spin}
                                        QR={QRSrc || placeholderQR} 
                                    />
                                </animated.section>
                            )
                        )
                }
            <button 
                onClick={printDoc} 
                className={[style.btn, style.centered].join(" ")}
            >
                Print Your Badge!
            </button>
            <div className={[style.panel, style.centered].join(" ")}>
                <Form 
                    state={state} 
                    dispatch={dispatch} 
                    focusHandler={displayActiveSide}
                    generateQR={generateQR}
                />
            </div>
        </div>
        <div className={style.toPrint}>
            <CardFront  
                state={state} 
                spin={spin} 
                image={imageSrc || image} 
                className={[style.card, style.centered].join(" ")}
            />
            <br />
            <CardRear  
                state={state} 
                spin={spin} 
                QR={QRSrc || placeholderQR}
                className={[style.card, style.centered].join(" ")}
            />
        </div>
    </>
    );
};

export default App;