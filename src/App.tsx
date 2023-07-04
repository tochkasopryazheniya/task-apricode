import React from 'react';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './assets/styles/style.scss'
import Title from "./components/Title/Title";
import AllTasks from "./components/AllTasks/AllTasks";

function App() {
    return (
        <div className='container'>
            <Title/>
            <AllTasks/>
        </div>
    );
}

export default App;
