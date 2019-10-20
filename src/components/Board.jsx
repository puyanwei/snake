import React, { useState, useEffect } from 'react';

import Tile from './Tile.jsx';

const Board = ({ rows, cols }) => {

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const onKeyPress = (e) => {
            switch (e.keyCode) {
                case 38:
                    console.log("up");
                    if ((position.x - 1) >= 0) {
                        setPosition({ ...position, x: position.x - 1 })
                    }
                    break;
                case 40:
                    console.log("down");
                    if ((position.x + 1) < rows) {
                        setPosition({ ...position, x: position.x + 1 })
                    }
                    break;
                case 37:
                    console.log("left");
                    if ((position.y - 1) >= 0) {
                        setPosition({ ...position, y: position.y - 1 })
                    }
                    break;
                case 39:
                    console.log("right");
                    if ((position.y + 1) < cols) {
                        setPosition({ ...position, y: position.y + 1 })
                    }
                    break;

                default:
                    throw new Error();
            }
        }
        window.addEventListener("keydown", onKeyPress);
        return () => window.removeEventListener("keydown", onKeyPress)

    }, [position, cols, rows])

    const style = {
        maxHeight: `${2 * rows}rem`,
        maxWidth: `${2 * cols}rem`,
        margin: '0 auto',
        paddingTop: '4rem'
    };

    const borderCheck = () => {

    }


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
