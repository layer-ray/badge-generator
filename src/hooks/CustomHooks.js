import React, {useState} from 'react';

const useForm = (callback) => {
    const [inputs, setInputs] = useState({});
    
    const handleChange = e => {
        const {name, value} = e.target;
        setInputs(inputs => ({...inputs, [name]: value}));
    }

    const handleSubmit = e => {
        if(e){
            e.preventDefault();
        };
        callback();
    };

    return {
        handleSubmit,
        handleChange,
        inputs
    };
};

export default useForm;