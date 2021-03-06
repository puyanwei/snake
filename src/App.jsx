import React from 'react';

import Home from './pages/Home';
import SnakeContextProvider from './contexts/snakeContext.jsx';
import './App.css';

const App = () => {
    return (
        <SnakeContextProvider>
            <Home />
        </SnakeContextProvider>
    )
};

export default App;
