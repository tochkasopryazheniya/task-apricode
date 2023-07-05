import React from 'react';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './assets/styles/style.scss'
import Title from "./components/Title/Title";
import AllTasks from "./components/AllTasks/AllTasks";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Search from "./components/Search/Search";

function App() {
    return (
        <div className='container'>
            <ToastContainer/>
            <Title/>
            <Search/>
            <AllTasks/>
        </div>
    );
}

export default App;
