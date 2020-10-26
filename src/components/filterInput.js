import React from 'react';

function FilterInput(props) {
    return (
        <div>
            <input className='custom-checkbox' type="checkbox" name={props.stop.name} id={props.stop.name} onChange={() => props.handlChange(props.stop.id)} />
            <label className='black-text-md' htmlFor={props.stop.name}>{props.stop.label}</label>
        </div>
    );
}

export default FilterInput;