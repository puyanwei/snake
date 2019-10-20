import React, { useState, useEffect } from 'react';

import Tile from './Tile.jsx';

const Board = ({ rows, cols }) => {

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const onKeyPress = (e) => {
            switch (e.keyCode) {
                case 40:
                    console.log("Its down");
                    setPosition({ ...position, x: position.x + 1 })
                    break;
                case 38:
                    console.log("Its up");
                    setPosition({ ...position, x: position.x - 1 })
                    break;
                case 37:
                    console.log("Its left");
                    setPosition({ ...position, y: position.y - 1 })
                    break;
                case 39:
                    console.log("Its right");
                    setPosition({ ...position, y: position.y + 1 })
                    break;

                default:
                    throw new Error();
            }
        }
        window.addEventListener("keydown", onKeyPress);
        return () => window.removeEventListener("keydown", onKeyPress)

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
