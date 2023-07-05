import React from 'react';
import s from './input.module.scss';

type InputProps = {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string
}

const Input = ({value, onChange, placeholder}: InputProps) => {
    return (
        <input className={s.input} value={value} onChange={onChange} type="text" placeholder={placeholder}/>
    );
};

export default Input;