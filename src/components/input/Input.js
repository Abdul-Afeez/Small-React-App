import React from 'react';

function Input(props) {

    return (
        <input {...props}  className="form-control mt-1 mb-1" required={true} />
    )
}
export default Input;