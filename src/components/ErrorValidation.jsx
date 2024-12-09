import React from 'react'

const ErrorValidation = ({touched, errors, error}) => {
    return <p className='text-errorValidation text-sm'>{(touched && errors) || error}</p>
}

export default ErrorValidation