import React from 'react';

import Tile from './Tile';

const Board = ({ rows, cols }) => {
    const style = {
        maxHeight: `${2 * rows}rem`,
        maxWidth: `${2 * cols}rem`,
        margin: "0 auto",
        paddingTop: "4rem"
    };

    const createGrid = () => {
        let grid = Array.from(Array(rows), () =>
            new Array(cols))

        let num = 0;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                num++
                grid[i][j] = (<Tile isActive={false} key={num} />)
            }
        }
        return grid;
    }

    return (
        <div style={style}>
            {createGrid()}
        </div>
    )
};

export default Board;
