import React, {useContext} from 'react';

import {FirstContext} from '../../App';
import cardStyle from './card-one.module.scss';
import image from './imgs/placeholder.jpg';


const CardFront = () => {

    const {first} = useContext(FirstContext);

    return (
        <div className={cardStyle.test}>
            <img src={image} alt="myImage" width="150" height="150"/>
            <div className={cardStyle.field}>
                <span>{first}</span>
            </div>
            <div className={cardStyle.field}>
                <span>Test name n°2</span>
            </div>
            <div className={cardStyle.field}>
                <span>Test name n°3</span>
            </div>
        </div>
    );    
};

export default CardFront;