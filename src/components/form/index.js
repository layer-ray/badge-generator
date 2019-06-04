import React, {useState} from 'react';

import formStyle from './form.module.scss';
import image from '../../../public/imgs/qr_wiki_en.png';

    
const Form = props => {
    const {state, dispatch} = props;
    const {firstName, lastName, email, github, twitter} = state;

    return(
        <form className={formStyle.form}>
            <div className={formStyle.field}>
                <label htmlFor="first-name">First name</label>
                <input 
                    type="text" 
                    name="firstName" 
                    id="first-name"
                    size="1"
                    onChange={e => dispatch({type: 'first',payload: e.target.value})}
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
                    onChange={e => dispatch({type: 'last',payload: e.target.value})}
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
                    onChange={e => dispatch({type: 'email',payload: e.target.value})}
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
                    onChange={e => dispatch({type: 'github',payload: e.target.value})}
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
                        onChange={e => dispatch({type: 'twitter',payload: e.target.value})}
                        value={twitter}
                    />
                </div>
            </div>
            <div className={formStyle.field}>
                <div className={formStyle.buttons}>
                    <input className={[formStyle.btn, formStyle.success].join(" ")} type="submit" value="create"/>
                    <button className={[formStyle.btn, formStyle.error].join(" ")}>cancel</button>
                </div>
                <div className={formStyle.image}>
                    <label htmlFor="email">QR Code</label>
                    <img src={image} alt="placeholder" width="100px" height="100px" />
                </div>
            </div>
        </form>
    );
};

export default Form;