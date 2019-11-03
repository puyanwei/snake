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
    }, [cols, rows])

    useEffect(() => {
        const snakeFoodCollisionChecker = () => {
            if (position.row === foodPosition.row && position.col === foodPosition.col) {
                setFoodPosition({ row: randomPosition(rows), col: randomPosition(cols) })
            }
        }
        snakeFoodCollisionChecker()
    })

    useEffect(() => {
        console.log('direction', direction)
        const onKeyPress = (e) => {
            switch (e.keyCode) {
                case 38:
                    return direction === "down" || setDirection("up");
                case 40:
                    return direction === "up" || setDirection("down");
                case 37:
                    return direction === "right" || setDirection("left");
                case 39:
                    return direction === "left" || setDirection("right");
                default:
                    break;
            }
        };
        window.addEventListener("keydown", onKeyPress);
        return () => window.removeEventListener("keydown", onKeyPress);
    }, [direction]);

    useEffect(() => {
        const interval = setInterval(() => {
            switch (direction) {
                case "up":
                    if (row - 1 >= 0) {
                        setPosition(() => { return { ...position, row: row - 1 } });
                    }
                    break;
                case "down":
                    if (row + 1 < rows) {
                        setPosition(() => { return { ...position, row: row + 1 } });
                    }
                    break;
                case "left":
                    if (col - 1 >= 0) {
                        setPosition(() => { return { ...position, col: col - 1 } });
                    }
                    break;
                case "right":
                    if (col + 1 < cols) {
                        setPosition(() => { return { ...position, col: col + 1 } });
                    }
                    break;

                default:
                    break;
            }
        }, 500);
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
