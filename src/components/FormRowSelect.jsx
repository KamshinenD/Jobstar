import React from 'react'

const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className='form-label'>
                {labelText || name}
            </label>
            <select name={name} className="form-select" value={value} onChange={handleChange} id={name}>
                {list.map((itemValue, index) => {
                    return (
                        <option key={index} value={itemValue}>
                            {itemValue}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default FormRowSelect