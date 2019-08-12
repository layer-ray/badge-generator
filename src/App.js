import React, {useState, useReducer} from 'react';

import QRCode from 'qrcode';
import {useSpring, useTransition, animated, config} from 'react-spring';

import Notification from './components/notification';
import CardFront from './components/cardOne/CardFront';
import CardRear from './components/cardOne/CardRear';
import Form from './components/form';

import style from './app.module.scss';

import placeholderImage from '../public/imgs/placeholder.jpg';
import placeholderQR from '../public/imgs/qr_wiki_en.png';

// from emailregex.com
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
                // side effects?
                setImageSrc(placeholderImage);
                setQRSrc(placeholderQR);
                setIsValid(false);
                return initialState;
            default:
                throw Error('Unknown event occurred')
        }
    };

    const [side, flip] = useState(true);
    // form data
    const [isValid, setIsValid] = useState(false);
    // notification (default just as reference)
    const [status, setStatus] = useState({
        message: '',
        type: '',
        timer: 0,
        active: false
    });
    const [QRSrc, setQRSrc] = useState(placeholderQR);
    const [imageSrc, setImageSrc] = useState(placeholderImage);
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
        let imgSrc = prompt('insert url');
        const tmpImg = document.createElement('img');
        tmpImg.setAttribute('src', imgSrc);
        tmpImg.onerror = function(err){
            imgSrc= null;
            console.error('err',err);
        };
        tmpImg.onload = function(){
            setImageSrc(imgSrc);
        };
    }

    const validateFields = () => {

        if(state.firstName === "" || state.lastName === "" || state.email === ""){
            displayNotification('All fields marked with asterisk(*) are required!', 'error', 2000);
            throw new Error('All fields marked with asterisk(*) are required!');
        };

        if(!emailRegex.test(state.email)){
            displayNotification('Please insert a valid email!', 'error', 2000);
            throw new Error('Please insert a valid email');    
        };
        setIsValid(true);
        setStatus({
            message: '',
            type: '',
            active: false
        });
    }

    const generateQR = () => {
        const data = JSON.stringify(state);
        QRCode.toDataURL(data)
                .then(QR => {
                    setQRSrc(QR);
                    displayNotification('Badge generated!', 'success', 2000);
                })
                .catch( error => {
                    displayNotification( error, 'error', 2000);
                    throw new Error(error);
                });
    }

    const submitData = () => {
        validateFields();
        generateQR();
    };

    const displayNotification = (message, type, ms) => {
        // in xx ms status will be set inactive
        let timer = setTimeout(() => {
            setStatus(prevStatus => ({...prevStatus, active: false}))
            }, ms);
        
        // if notification is already active it will be restarted
        if(status.active) {
            // the timer already set has to be removed otherwise
            // it would have an effect on the new animation
            clearTimeout(status.timer);
            setStatus(prevStatus => ({...prevStatus, message: '', active: false}));

            setTimeout(() => setStatus({message, type, timer, active: true}), 150);
        } else {
           setStatus({message, type, timer, active: true});
        }
    };

    const transitions = useTransition(side, null, {
        initial: { position: 'absolute', opacity: 0, transform: 'rotateY(0deg)' },
        from: { position: 'absolute', opacity: 0, transform: 'rotateY(-180deg)' },
        enter: { opacity: 1, transform: 'rotateY(0deg)' },
        leave: { opacity: 0, transform: 'rotateY(-180deg)' },
        unique: true,
        reset: true,
        config: config.molasses
    });

    const notificationProps = useSpring({ 
        to: {top: status.active ? '100px': '-200px'}
        })
    return (
        <>
            <animated.div className={[style.notificationWrapper, style.centered].join(" ")} style={notificationProps}>
                <Notification 
                    message={status.message} 
                    type={status.type}
                />
            </animated.div>
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
                disabled={!isValid}
            >
                Print Your Badge!
            </button>
            <div className={[style.panel, style.centered].join(" ")}>
                <Form 
                    state={state} 
                    dispatch={dispatch} 
                    focusHandler={displayActiveSide}
                    submitData={submitData}
                    QR={QRSrc || placeholderQR} 
                />
            </div>
        </div>
        <div className={[style.card, style.centered, style.toPrint].join(" ")}>
            <CardFront  
                state={state} 
                spin={spin} 
                image={imageSrc || image} 
                
            />
            <br />
            <CardRear  
                state={state} 
                spin={spin} 
                QR={QRSrc || placeholderQR}
            />
        </div>
    </>
    );
};

export default App;