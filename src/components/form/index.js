import React, {useState} from 'react';

import formStyle from './form.module.scss';
import image from '../../../public/imgs/qr_wiki_en.png';
import PropTypes from 'prop-types';

const Form = props => {
    const {state, dispatch, focusHandler, generateQR} = props;
    const {firstName, lastName, email, github, twitter} = state;
    const resetAll = e => {
        e.preventDefault();
        dispatch({type:'reset'})
    };

    return(
        <form className={formStyle.form}>
            <div className={formStyle.field}>
                <label htmlFor="first-name">First name</label>
                <input 
                    type="text" 
                    name="firstName" 
                    id="first-name"
                    size="1"
                    maxLength="17"
                    onChange={e => dispatch({type: 'first',payload: e.target.value})}
                    onFocus={focusHandler}
                    value={firstName}
                    required
                />
            </div>
            <div className={formStyle.field}>
                <label htmlFor="last-name">Last name</label>
                <input 
                    type="text"
                    name="lastName"
                    id="last-name"
                    size="1"
                    maxLength="17"
                    onChange={e => dispatch({type: 'last',payload: e.target.value})}
                    onFocus={focusHandler}
                    value={lastName}
                    required
                />
            </div>
            <div className={formStyle.field}>
                <label htmlFor="email">Email</label>
                <input 
                    type="text" 
                    name="email"
                    id="email"
                    size="1"
                    maxLength="40"
                    onChange={e => dispatch({type: 'email',payload: e.target.value})}
                    onFocus={focusHandler}
                    value={email}
                    required
                />
            </div>
            <div className={formStyle.field}>
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
                />
            </div>
            <div className={formStyle.field}>
                <label htmlFor="twitter">Twitter account</label>
                <div className={formStyle.combinedField}>
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
                    />
                </div>
            </div>
            <div className={formStyle.field}>
                <div className={formStyle.buttons}>
                    <input 
                        className={[formStyle.btn, formStyle.success].join(" ")} 
                        type="submit" 
                        value="create"
                        onClick={generateQR}
                    />
                    <button 
                        className={[formStyle.btn, formStyle.error].join(" ")}
                        onClick={resetAll}
                    >
                        cancel
                    </button>
                </div>
                <div className={formStyle.image}>
                    <label htmlFor="email">QR Code</label>
                    <img src={image} alt="placeholder" width="100px" height="100px" />
                </div>
            </div>
        </form>
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
    generateQR: PropTypes.func.isRequired
}

export default Form;