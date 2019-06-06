import PropTypes from 'prop-types';

import cardStyle from './card-one.module.scss';
import image from './imgs/qr_wiki_en.png';

const CardRear = () => {
    return (
        <div className={cardStyle.test}>
            <img src={image} alt="myImage" width="150" height="150"/>
            <div className={cardStyle.field}>
                <span>Test name n°1</span>
            </div>
            <div className={cardStyle.field}>
                <span>Test name n°2</span>
            </div>
            <div className={cardStyle.field}>
                <span>Test name n°3</span>
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