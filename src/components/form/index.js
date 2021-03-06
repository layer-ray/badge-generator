import React, {useState} from 'react';

import style from './form.module.scss';
import PropTypes from 'prop-types';

const Form = props => {
    const {state, dispatch, focusHandler, submitData, QR, removeFreeze, isFrozen} = props;
    const {firstName, lastName, email, github, twitter} = state;
    const resetAll = e => {
        e.preventDefault();
        removeFreeze(true);
        dispatch({type:'reset'})
    };

    const submitHandler = e => {
        e.preventDefault();
        submitData();
    };
    return(
        <>
        <div>
            <span className={style.caption}>
                fields marked with asterisk(*) are required
            </span>
        </div>
        <form className={style.form} onSubmit={submitHandler}>
            <div className={style.field}>
                <label htmlFor="first-name">First name*</label>
                <input 
                    type="text" 
                    name="firstName" 
                    id="first-name"
                    size="1"
                    maxLength="17"
                    onChange={e => dispatch({type: 'first',payload: e.target.value})}
                    onFocus={focusHandler}
                    value={firstName}
                    disabled={isFrozen}
                />
            </div>
            <div className={style.field}>
                <label htmlFor="last-name">Last name*</label>
                <input 
                    type="text"
                    name="lastName"
                    id="last-name"
                    size="1"
                    maxLength="17"
                    onChange={e => dispatch({type: 'last',payload: e.target.value})}
                    onFocus={focusHandler}
                    value={lastName}
                    disabled={isFrozen}
                />
            </div>
            <div className={style.field}>
                <label htmlFor="email">Email*</label>
                <input 
                    type="text" 
                    name="email"
                    id="email"
                    size="1"
                    maxLength="40"
                    onChange={e => dispatch({type: 'email',payload: e.target.value})}
                    onFocus={focusHandler}
                    value={email}
                    disabled={isFrozen}
                />
            </div>
            <div className={style.field}>
                <label htmlFor="github">Github account</label>
                <input 
                    type="text" 
                    name="github" 
                    id="github"
                    size="1"
                    maxLength="17"
                    onChange={e => dispatch({type: 'github',payload: e.target.value})}
                    onFocus={focusHandler}
                    value={github}
                    disabled={isFrozen}
                />
            </div>
            <div className={style.field}>
                <label htmlFor="twitter">Twitter account</label>
                <div className={style.combinedField}>
                    <span>@</span>
                    <input 
                        type="text" 
                        name="twitter" 
                        id="twitter"
                        size="1"
                        maxLength="17"
                        onChange={e => dispatch({type: 'twitter',payload: e.target.value})}
                        onFocus={focusHandler}
                        value={twitter.slice(1)}
                        disabled={isFrozen}
                    />
                </div>
            </div>
            <div className={style.field}>
                <div className={style.buttons}>
                    <input 
                        className={[style.btn, style.success].join(" ")} 
                        type="submit" 
                        value="generate QR code*"
                    />
                    <button 
                        className={[style.btn, style.error].join(" ")}
                        onClick={resetAll}
                    >
                        cancel
                    </button>
                </div>
                <div className={style.image}>
                    <label htmlFor="email">QR Code</label>
                    <img src={QR} alt="placeholder" width="100px" height="100px" />
                </div>
            </div>
        </form>
        </>
    );
};

Form.propTypes = {
    state: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        github: PropTypes.string,
        twitter: PropTypes.string,
    }),
    dispatch: PropTypes.func.isRequired,
    focusHandler: PropTypes.func.isRequired,
    submitData: PropTypes.func.isRequired
}

export default Form;