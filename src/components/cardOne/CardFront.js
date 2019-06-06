import React from 'react';

import cardStyle from './card-one.module.scss';
import image from './imgs/placeholder.jpg';

const CardFront = props => {
    const {firstName, lastName, email} = props.state;
    return (
         <div className={style.badge}>
             <button onClick={spin} className={style.btn}>toggle</button>
             <figure className={style.figure}>
                <img src={image} alt="myPhoto" width="150" height="150"/> 
                <button 
                    className={style.overlayBtn}
                    onClick={load}
                >
                     + 
                </button>
             </figure>
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