import React, { useState, useEffect } from "react";

import Tile from "./Tile.jsx";

const Board = ({ rows, cols }) => {
    const [snakePositions, setSnakePositions] = useState([{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }]);
    const [direction, setDirection] = useState(null);
    const [foodPosition, setFoodPosition] = useState({ row: null, col: null })
    const [gameOver, setGameOver] = useState(false)

    const randomPosition = (biggestNumber) => Math.floor(Math.random() * biggestNumber)
    const isCollision = () => snakePositions.row === foodPosition.row && snakePositions.col === foodPosition.col

    useEffect(() => {
        setFoodPosition({ row: randomPosition(rows), col: randomPosition(cols) })
        // TODO: Check that random position is not the same as snake starting position. Might just be better to do this check with the context/reducer refactor later on.
    }, [cols, rows])

    useEffect(() => {
        const collisionChecker = () => {
            if (isCollision()) {
                setFoodPosition({ row: randomPosition(rows), col: randomPosition(cols) })
            }
        }
        collisionChecker()
    })

    useEffect(() => {
        const onKeyPress = (e) => {
            switch (e.keyCode) {
                case 38: //Up
                    return direction === "down" || setDirection("up");
                case 40: // Down
                    return direction === "up" || setDirection("down");
                case 37: //Left
                    return direction === "right" || setDirection("left");
                case 39: // Right
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
                    return (snakePositions.row - 1 >= 0) ?
                        setSnakePositions(() => { return { ...snakePositions, row: snakePositions.row - 1 } }) :
                        setGameOver(true);
                case "down":
                    return (snakePositions.row + 1 < rows) ?
                        setSnakePositions(() => { return { ...snakePositions, row: snakePositions.row + 1 } }) :
                        setGameOver(true);
                case "left":
                    return (snakePositions.col - 1 >= 0) ?
                        setSnakePositions(() => { return { ...snakePositions, col: snakePositions.col - 1 } }) :
                        setGameOver(true);
                case "right":
                    return (snakePositions.col + 1 < cols) ?
                        setSnakePositions(() => { return { ...snakePositions, col: snakePositions.col + 1 } }) :
                        setGameOver(true);
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

    const checkEachSnakePosition = (i, j) => {
        let result =
            snakePositions.some(snakePosition => {
                return snakePosition.row === i && snakePosition.col === j
            })
        console.log(1, result)
        return result;
    }

    const renderBoard = () => {
        let grid = Array.from(Array(rows), () => new Array(cols));

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j] = (
                    <Tile
                        isActive={checkEachSnakePosition(i, j)}
                        isFood={foodPosition.row === i && foodPosition.col === j}
                        key={`${[i, j]}`}
                    />
                );
            }
        }
        return grid;
    };

    return (
        gameOver ?
            <div>GAME OVER</div> :
            <div style={style}>{renderBoard()}</div>
    )
};

export default Board;
