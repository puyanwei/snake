import React, { useState, useEffect } from "react";

import Tile from "./Tile.jsx";

const Board = ({ rows, cols }) => {
    const [position, setPosition] = useState({ row: 0, col: 0 });
    const [direction, setDirection] = useState(null);
    const [foodPosition, setFoodPosition] = useState({ row: null, col: null })

    const { row, col } = position

    const randomPosition = (biggestNumber) => Math.floor(Math.random() * biggestNumber)

    useEffect(() => {
        setFoodPosition({ row: randomPosition(rows), col: randomPosition(cols) })
        // TODO: Check that random position is not the same as snake starting position
    }, [])

    useEffect(() => {
        const onKeyPress = (e) => {
            switch (e.keyCode) {
                case 38:
                    return setDirection("up");
                case 40:
                    return setDirection("down");
                case 37:
                    return setDirection("left");
                case 39:
                    return setDirection("right");
                default:
                    break;
            }
        };
        window.addEventListener("keydown", onKeyPress);
        return () => window.removeEventListener("keydown", onKeyPress);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            switch (direction) {
                case "up":
                    if (row - 1 >= 0) {
                        setPosition(cb => { return { ...position, row: row - 1 } });
                    }
                    break;
                case "down":
                    if (row + 1 < rows) {
                        setPosition(cb => { return { ...position, row: row + 1 } });
                    }
                    break;
                case "left":
                    if (col - 1 >= 0) {
                        setPosition(cb => { return { ...position, col: col - 1 } });
                    }
                    break;
                case "right":
                    if (col + 1 < cols) {
                        setPosition(cb => { return { ...position, col: col + 1 } });
                    }
                    break;

                default:
                    break;
            }
        }, 1000);
        return () => clearInterval(interval);
    });

    const style = {
        maxHeight: `${2 * rows}rem`,
        maxWidth: `${2 * cols}rem`,
        margin: "0 auto",
        paddingTop: "4rem"
    };

    const renderBoard = () => {
        let grid = Array.from(Array(rows), () => new Array(cols));

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j] = (
                    <Tile
                        isActive={row === i && col === j}
                        isFood={foodPosition.row === i && foodPosition.col === j}
                        key={`${[i, j]}`}
                    />
                );
            }
        }
        return grid;
    };

    return <div style={style}>{renderBoard()}</div>;
};

export default Board;
