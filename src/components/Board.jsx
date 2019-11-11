import React, { useContext, useEffect } from "react";

import Tile from "./Tile.jsx";
import { snakeContext } from '../contexts/snakeContext'

const Board = () => {
    const {
        state: {
            snake, prev, food, direction, gameOver
        },
        dispatch,
        rows,
        cols
    } = useContext(snakeContext)

    // const isCollision = () => snakePositions[0].row === foodPosition.row && snakePositions[0].col === foodPosition.col

    // useEffect(() => {
    //     const collisionChecker = () => {
    //         if (isCollision()) {
    //             setFoodPosition({ row: randomPosition(rows), col: randomPosition(cols) })
    //             setSnakePositions([...snakePositions, prevPosition])
    //         }
    //     }
    //     collisionChecker()
    // })

    useEffect(() => {
        const onKeyPress = (e) => {
            switch (e.keyCode) {
                case 38: //Up
                    return direction === "down" || dispatch({ type: 'DIRECTION', payload: "up" });
                case 40: // Down
                    return direction === "up" || dispatch({ type: 'DIRECTION', payload: "down" });
                case 37: //Left
                    return direction === "right" || dispatch({ type: 'DIRECTION', payload: "left" });
                case 39: // Right
                    return direction === "left" ||
                        dispatch({ type: 'DIRECTION', payload: "right" });
                default:
                    break;
            }
        };
        window.addEventListener("keydown", onKeyPress);
        return () => window.removeEventListener("keydown", onKeyPress);
    }, [direction]);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log({ direction })
            console.log(snake[0], snake[0].y, snake[0].x)
            switch (direction) {
                case "up":
                    // if (snakePositions[0].row - 1 >= 0) {
                    // setPrevPosition(snakePositions[snakePositions.length - 1]);
                    dispatch({ type: 'SNAKE', payload: { ...snake[0], y: snake[0].y - 1 } })
                    break

                case "down":
                    // if (snakePositions[0].row + 1 < rows) {
                    // setPrevPosition(snakePositions[snakePositions.length - 1])
                    dispatch({ type: 'SNAKE', payload: { ...snake[0], y: snake[0].y + 1 } })
                    break;
                case "left":
                    // if (snakePositions[0].col - 1 >= 0) {
                    // setPrevPosition(snakePositions[snakePositions.length - 1])
                    dispatch({ type: 'SNAKE', payload: { ...snake, x: snake[0].x - 1 } })
                    break;
                case "right":
                    // if (snakePositions[0].col + 1 < cols) {
                    // setPrevPosition(snakePositions[snakePositions.length - 1])
                    dispatch({ type: 'SNAKE', payload: { ...snake[0], x: snake[0].x + 1 } })
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

    const isActiveMatchingState = (i, j) => {
        console.log('matcher', snake)
        return snake.some(snakeTile =>
            snakeTile.y === i && snakeTile.x === j
        )
    }

    const renderBoard = () => {
        let grid = Array.from(Array(rows), () => new Array(cols));

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j] = (
                    <Tile
                        isActive={isActiveMatchingState(i, j)}
                        isFood={food.y === i && food.x === j}
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
