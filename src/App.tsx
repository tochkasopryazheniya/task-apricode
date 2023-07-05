import React from 'react';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './assets/styles/style.scss'
import Title from "./components/Title/Title";
import AllTasks from "./components/AllTasks/AllTasks";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className='container'>
            <ToastContainer/>
            <Title/>
            <AllTasks/>
        </div>
    );
}

export default App;
