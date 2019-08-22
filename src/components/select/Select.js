import React from 'react';
function Select({name, data, current, required, onChange}) {
    return (
        <select onChange={onChange} className="form-control" name={name} required={required || true}>
            <option value={''} key={data.placeholder}>{data.placeholder}</option>
            {data.raw.map((datum) => datum[data.key] === current ? <option value={datum[data.key]} key={datum[data.value]} selected={true}>{datum[data.value]}</option> : <option key={datum[data.value]}  value={datum[data.value]}>{datum[data.value]}</option>)}
        </select>
    )
}
export default Select;