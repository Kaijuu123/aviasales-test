import React from 'react';
import FilterInput from './filterInput';

function Filter(props) {
    let input = props.stops.map(stop => {
        return <FilterInput key={stop.id} stop={stop} handleChange={() => { props.handleChange(stop.id) }} />
    });

    return (
        <div className='filter-block'>
            <h3 className='black-text'>Количество пересадок</h3>
            <div className='filter-options'>
                {input}
            </div>
        </div>
    );
}

export default Filter;