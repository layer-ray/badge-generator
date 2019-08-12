import React, {useState} from 'react';
import PropTypes from 'prop-types';

import style from './card-one.module.scss';


const CardFront = props => {
    const {firstName, lastName} = props.state;
    const {spin, image, load} = props;
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
            
            <div>
                <div className={style.field}>
                    <span>{firstName || 'Jhon'}</span>
                </div>
                <div className={style.field}>
                    <span>{lastName || 'Doe'}</span>
                </div>
            </div>
        </div>
    );
};

CardFront.propTypes = {
    state: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
    }),
    spin: PropTypes.func.isRequired,
    image: PropTypes.string,
    load: PropTypes.func
};

export default CardFront;