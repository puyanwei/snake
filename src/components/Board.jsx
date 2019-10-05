import React, { useEffect, useContext } from 'react';

import Tile from './Tile';
import { snakeContext } from '../contexts/snakeContext';

const Board = ({ rows, cols }) => {
    const { state: { boardState }, dispatch } = useContext(snakeContext);


    const style = {
        maxHeight: `${2 * rows}rem`,
        maxWidth: `${2 * cols}rem`,
        margin: "0 auto",
        paddingTop: "4rem"
    };

    useEffect(() => {
        const createGrid = () => {
            let grid = Array.from(Array(rows), () =>
                new Array(cols))

            let num = 0;
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    num++
                    grid[i][j] = <Tile isActive={isMiddleTile(num)} key={num} />
                }
            }
            dispatch({ type: 'BOARD_STATE', payload: grid });
        }
        createGrid()
    })

    const isMiddleTile = (num) =>
        num === Math.ceil((rows * cols / 2) - (cols / 2))

    return (
        <div style={style}>
            {boardState}
        </div>
    )
};

export default Board;
