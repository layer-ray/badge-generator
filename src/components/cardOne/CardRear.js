import React from 'react';
import PropTypes from 'prop-types';

import style from './card-one.module.scss';
import image from './imgs/qr_wiki_en.png';

const splitOverMultipleLines = (string, limit) => {
    let i = 0;
    let nodeArr = [];
    while (i< string.length) {
        i+=limit;
        nodeArr.push(<span key={i}>{string.substr(i-limit, limit)}</span>);
        nodeArr.push(<br key={i+1} />)
    };
    return nodeArr;
}

const CardRear = props => {
    const {email, github, twitter} = props.state;
    const {spin} = props;
    return (
        <div className={style.badge}>
             <button onClick={spin} className={style.btn}>toggle</button>
            <div>
                <div className={style.field}>
                {
                email.length >18 
                    ? splitOverMultipleLines(email, 17)
                    :   <span>{email || 'Jhon_Doe@cool.com'}</span>
                }
                </div>
                <div className={style.field}>
                    <span>{github || 'Jhonny_Doe'}</span>
                </div>
                <div className={style.field}>
                    <span>{twitter || '@Doe44'}</span>
                </div>
            </div>
            <img src={image} alt="myImage" width="150" height="150"/>
        </div>
    );    
};

CardRear.propTypes = {
    state: PropTypes.shape({
        email: PropTypes.string.isRequired,
        github: PropTypes.string.isRequired,
        twitter: PropTypes.string.isRequired,
    }),
    spin: PropTypes.func.isRequired
};

export default CardRear;