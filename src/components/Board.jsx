import React, { useState, useEffect } from "react";

import Tile from "./Tile.jsx";

const Board = ({ rows, cols }) => {
    const [snakePositions, setSnakePositions] = useState([{ row: 0, col: 0 }]);
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
                setSnakePositions([...snakePositions, snakePositions[0]])
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
                    if (snakePositions[0].row - 1 >= 0) {
                        setSnakePositions(() => snakePositions.map((snakePosition, i) => {
                            return { ...snakePositions[i], row: snakePosition.row - 1 }
                        }))
                    }
                    break;
                case "down":
                    if (snakePositions[0].row + 1 < rows) {
                        setSnakePositions(() => snakePositions.map((snakePosition, i) => {
                            return { ...snakePositions[i], row: snakePosition.row + 1 }
                        }))
                    }
                    break
                case "left":
                    if (snakePositions[0].col - 1 >= 0) {
                        setSnakePositions(() => snakePositions.map((snakePosition, i) => {
                            return { ...snakePositions[i], col: snakePosition.col - 1 }
                        }))
                    }
                    break
                case "right":
                    if (snakePositions[0].col + 1 < cols) {
                        setSnakePositions(() => snakePositions.map((snakePosition, i) => {
                            return { ...snakePositions[i], col: snakePosition.col + 1 }
                        }))
                    }
                    break
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

    const checkEachSnakeTilePosition = (i, j) => {
        let result =
            snakePositions.some(snakePosition => {
                return snakePosition.row === i && snakePosition.col === j
            })
        return result;
    }

    const renderBoard = () => {
        let grid = Array.from(Array(rows), () => new Array(cols));

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j] = (
                    <Tile
                        isActive={checkEachSnakeTilePosition(i, j)}
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
