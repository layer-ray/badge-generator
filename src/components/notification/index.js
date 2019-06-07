import React from 'react';
import PropTypes from 'prop-types';

import style from './notification.module.scss';
const Notification = ({message, type}) => (
    <div className={[style.notification, style[type]].join(" ")}>
        <span>{message}</span>
    </div>
);

Notification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
}

export default Notification;