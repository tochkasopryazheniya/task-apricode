import React from 'react';
import s from './search.module.scss';
import Input from "../SharedComponents/Input/Input";
import Store from "../../store/store";
import {observer} from "mobx-react-lite";

const Search = () => {
    const {searchValue, setSearchValue} = Store;
    return (
        <div className={s.input}>
            <Input value={searchValue} onChange={setSearchValue} placeholder='Поиск по названию задачи'/>
        </div>
    );
};

export default observer(Search);