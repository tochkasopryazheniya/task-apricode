import React from 'react';
import s from './checkbox.module.scss';

type CheckboxProps = {
    isChecked: boolean,
    onCheck: () => void,
    id: string,
    sm?: boolean
}

const Checkbox = ({isChecked, id, sm, onCheck}: CheckboxProps) => {
    return (
        <>
            <input checked={isChecked} className={s.input} type="checkbox" id={id} onChange={onCheck}/>
            <label className={`${s.label} ${sm ? s.sm : ''}`} htmlFor={id}></label>
        </>
    );
};

export default Checkbox;