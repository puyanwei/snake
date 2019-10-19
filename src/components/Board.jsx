import React, { useEffect, useContext } from 'react';

import Tile from './Tile.jsx';
import useKeyPress from '../hooks/useKeyPress';
import { snakeContext } from '../contexts/snakeContext';

const Board = ({ rows, cols }) => {
	const { state: { boardState, position }, dispatch } = useContext(snakeContext);
	const upArrow = useKeyPress('ArrowUp');
	const downArrow = useKeyPress('ArrowDown');
	const rightArrow = useKeyPress('ArrowRight');
	const leftArrow = useKeyPress('ArrowLeft');

	const style = {
		maxHeight: `${2 * rows}rem`,
		maxWidth: `${2 * cols}rem`,
		margin: '0 auto',
		paddingTop: '4rem'
	};

	let createBoard = () => {
		let grid = Array.from(Array(rows), () => new Array(cols));

		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				grid[i][j] = <Tile isActive={position.x === i && position.y === j} key={`${[ i, j ]}`} />;
			}
		}
		return grid;
	};

	return (
		<div style={style}>
			{createBoard()}
			<div>{upArrow && 'hello'}</div>
		</div>
	);
};

export default Board;
