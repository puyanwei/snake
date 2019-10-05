import React, { useContext, useEffect } from 'react';

import Board from '../components/Board';
import { snakeContext } from '../contexts/snakeContext';

const Home = () => {
    const { dispatch } = useContext(snakeContext);

    useEffect(() => {
        dispatch({ type: 'ROWS', payload: 20 })
        dispatch({ type: 'COLS', payload: 15 })
        // keep rows even, cols odd or middle will fuck up
    })

    return (
        <Board />
    );
};

export default Home;
