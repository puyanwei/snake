import React, { useState, useEffect } from 'react';

import Tile from './Tile.jsx';

const Board = ({ rows, cols }) => {

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {

        const goDown = (e) => {
            if (e.keyCode === 40) {
                console.log("Its down");
                setPosition({ ...position, x: position.x + 1 })
            }
        }
        document.addEventListener("keydown", goDown);
        return () => {
            document.removeEventListener("keydown", goDown)
        }
    }, [position])

    const style = {
        maxHeight: `${2 * rows}rem`,
        maxWidth: `${2 * cols}rem`,
        margin: '0 auto',
        paddingTop: '4rem'
    };


    const renderBoard = () => {
        let grid = Array.from(Array(rows), () => new Array(cols));

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j] = <Tile isActive={position.x === i && position.y === j} key={`${[i, j]}`} />;
            }
        }
        return grid;
    };


    return <div style={style}>{renderBoard()}</div>;
};

export default Board;
