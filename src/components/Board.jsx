import React, { useContext, useEffect } from "react";

import Tile from "./Tile.jsx";
import { snakeContext } from "../contexts/snakeContext.jsx";

const Board = () => {
    const {
        state: { snake, food, direction, gameOver },
        rows,
        cols,
        randomPosition,
        dispatch
    } = useContext(snakeContext);

    let snakeHead = snake[0];

    useEffect(() => {
        const onKeyPress = e => {
            switch (e.keyCode) {
                case 38: //Up
                    return (
                        direction === "down" ||
                        dispatch({ type: "DIRECTION", payload: "up" })
                    );
                case 40: // Down
                    return (
                        direction === "up" ||
                        dispatch({ type: "DIRECTION", payload: "down" })
                    );
                case 37: //Left
                    return (
                        direction === "right" ||
                        dispatch({ type: "DIRECTION", payload: "left" })
                    );
                case 39: // Right
                    return (
                        direction === "left" ||
                        dispatch({ type: "DIRECTION", payload: "right" })
                    );
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
                    if (snakeHead.y - 1 >= 0) {
                        return dispatch({
                            type: "SNAKE",
                            payload: { ...snakeHead, y: snakeHead.y - 1 }
                        });
                    }
                    break;
                case "down":
                    if (snakeHead.y + 1 < rows) {
                        return dispatch({
                            type: "SNAKE",
                            payload: { ...snakeHead, y: snakeHead.y + 1 }
                        });
                    }
                    break;
                case "left":
                    if (snakeHead.x - 1 >= 0) {
                        return dispatch({
                            type: "SNAKE",
                            payload: { ...snakeHead, x: snakeHead.x - 1 }
                        });
                    }
                    break;
                case "right":
                    if (snakeHead.x + 1 < cols) {
                        return dispatch({
                            type: "SNAKE",
                            payload: { ...snakeHead, x: snakeHead.x + 1 }
                        });
                    }
                    break;
                default:
                    break;
            }
        }, 500);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        const snakeFoodCollisionChecker = () => {
            if (snakeHead.x === food.x && snakeHead.y === food.y) {
                console.log("Collision!");

                dispatch({
                    type: "FOOD",
                    payload: {
                        x: randomPosition(cols),
                        y: randomPosition(rows)
                    }
                });
            }
        };
        snakeFoodCollisionChecker();
    });

    const style = {
        maxHeight: `${2 * rows}rem`,
        maxWidth: `${2 * cols}rem`,
        margin: "0 auto",
        paddingTop: "4rem"
    };

    const isActiveMatchingState = (i, j) => {
        return snake.some(snakeTile => snakeTile.y === i && snakeTile.x === j);
    };

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

    return gameOver ? (
        <div>GAME OVER</div>
    ) : (
        <div style={style}>{renderBoard()}</div>
    );
};

export default Board;
