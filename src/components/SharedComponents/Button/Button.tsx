import React, {ReactNode} from 'react';
import s from './button.module.scss';

type ButtonTypeProps = {
    children: ReactNode,
    red?: boolean,
    onClick: () => void
}

const Button = ({children, red, onClick}: ButtonTypeProps) => {
    return (
        <button onClick={onClick} className={`${s.button} ${red ? s.red : ''}`}>{children}</button>
    );
};

export default Button;