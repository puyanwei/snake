import React, { useContext, useEffect } from "react";

import Tile from "./Tile.jsx";
import { snakeContext } from '../contexts/snakeContext'

const Board = () => {
    const {
        state: {
            snake, food, direction, gameOver
        },
        dispatch,
        rows,
        cols
    } = useContext(snakeContext)

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
            switch (direction) {
                case "up":
                    dispatch({ type: 'SNAKE', payload: { ...snake[0], y: snake[0].y - 1 } })
                    break

                case "down":
                    dispatch({ type: 'SNAKE', payload: { ...snake[0], y: snake[0].y + 1 } })
                    break;
                case "left":
                    dispatch({ type: 'SNAKE', payload: { ...snake[0], x: snake[0].x - 1 } })
                    break;
                case "right":

                    dispatch({ type: 'SNAKE', payload: { ...snake[0], x: snake[0].x + 1 } })
                    break;
                default:
                    throw new Error();
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
