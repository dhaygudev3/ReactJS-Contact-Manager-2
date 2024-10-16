import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import WeatherCards from './WeatherCards'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Navigate to={'/Weather'} />} />
                <Route path='/Weather' element={<WeatherCards />} />
            </Routes>

        </>
    )
}

export default App