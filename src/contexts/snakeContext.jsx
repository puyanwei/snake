// beautify-ignore
import React, { createContext, useReducer, useMemo } from "react";
import { snakeReducer } from "../reducers/snakeReducer";

export const snakeContext = createContext();

const rows = 20;
const cols = 15;

const randomPosition = biggestNumber =>
    Math.floor(Math.random() * biggestNumber);

const initialState = {
    snake: [
        {
            x: 0,
            y: 0
        }
    ],
    tail: {
        x: null,
        y: null
    },
    food: {
        x: randomPosition(cols),
        y: randomPosition(rows)
    },
    direction: null,
    gameOver: false
};

const SnakeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(snakeReducer, initialState);

    const contextValue = useMemo(
        () => ({
            state,
            randomPosition,
            rows,
            cols,
            dispatch
        }),
        [state, dispatch]
    );

    return (
        <snakeContext.Provider value={contextValue}>
            {children}
        </snakeContext.Provider>
    );
};

export default SnakeContextProvider;
