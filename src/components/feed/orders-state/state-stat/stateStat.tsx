import style from './stateStat.module.css';
import React from 'react';
import PropTypes from 'prop-types';

type TStatProps = {
    label: string,
    amount: number,
}

export default function StateStat({label, amount}: TStatProps): JSX.Element {    

return (
    <div>
        <h2 className='text text_type_main-medium'>{label}</h2>
        <p className={`text text_type_digits-large ${style.glow}`}>{amount}</p>
    </div>
)}

// StateStat.propTypes = {
//     label: PropTypes.string,
//     amount: PropTypes.number,
// }