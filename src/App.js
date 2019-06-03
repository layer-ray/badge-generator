import React, {useState} from 'react';

import CardFront from './components/cardOne/CardFront';
import CardRear from './components/cardOne/CardRear';
import Form from './components/form';
import style from './app.module.scss';

const FirstContext = React.createContext({
    first: "",
    setFirst: () => {}
});

const App = () => {

    const [side, swapSide] = useState('front');

    let [state, setState] = useState({
        first: "",
        setFirst: text => setState({...state,first: text})
    });

    return (
        <FirstContext.Provider value={state}>
            <div className={style.container}>
                {
                    side === 'front' 
                    ?   <div className={style.cardFront}>
                            <CardFront />
                        </div>
                    :   <div className={style.cardRear}>
                            <CardRear />
                        </div>
                }
                <div className={style.panel}>
                    <Form />
                </div>
            </div>
        </FirstContext.Provider>
    );
};

export default App;
export { FirstContext }