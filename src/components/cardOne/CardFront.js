import React from 'react';

import cardStyle from './card-one.module.scss';
import image from './imgs/placeholder.jpg';

const CardFront = props => {
    const {firstName, lastName, email} = props.state;
    return (
         <div className={cardStyle.test}>
            <img src={image} alt="myImage" width="150" height="150"/> 
            <div className={cardStyle.field}>
                <span>{firstName || 'Jhon'}</span>
            </div>
            <div className={cardStyle.field}>
                <span>{lastName || 'Doe'}</span>
            </div>
            <div className={cardStyle.field}>
                <span>{email || 'Jhon_DaDoe@cool.com'}</span>
            </div>
        </div>
    );    
};

export default CardFront;