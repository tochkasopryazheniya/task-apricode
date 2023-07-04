import React from 'react';
import s from './checkbox.module.scss';

type CheckboxProps = {
    isChecked: boolean,
    onCheck: (event: React.ChangeEvent<HTMLInputElement>) => void,
    id: string,
    sm?: boolean
}

const Checkbox = ({isChecked, onCheck, id, sm}: CheckboxProps) => {
    return (
        <>
            <input checked={isChecked} className={s.input} onChange={onCheck} type="checkbox" id={id}/>
            <label className={`${s.label} ${sm ? s.sm : ''}`} htmlFor={id}></label>
        </>
    );
};

export default Checkbox;