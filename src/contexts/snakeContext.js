import React, { createContext, useReducer, useMemo } from 'react';
import { snakeReducer } from '../reducers/snakeReducer';

export const snakeContext = createContext();

const initialState = {
    boardState: Array.from(Array(20), () => new Array(15))
};

const SnakeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(snakeReducer, initialState);

    const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <snakeContext.Provider value={contextValue}>
            {children}
        </snakeContext.Provider>
    )
};

export default SnakeContextProvider;