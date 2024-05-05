import React from 'react';
import logo from './logo.svg';
import './App.css';
import useData from './api/useData';

function App() {
    const {data, isLoading, isError} = useData();
    return (
        <div className="App">
            {isLoading && (
                <p>Loading...</p>
            )}
            {!isLoading && !isError && (
                data?.map((d) => (
                    <>
                        <p>{d.sensor_name} | {d.sensor_value}</p>
                    </>
                ))
            )}
        </div>
    );
}

export default App;
