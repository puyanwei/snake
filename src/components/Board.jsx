import React, { useState } from 'react';

import Tile from './Tile.jsx';
import useKeyPress from '../hooks/useKeyPress';

const Board = ({ rows, cols }) => {
	const [ position, setPosition ] = useState({ x: 0, y: 0 });

	const arrowUp = useKeyPress('ArrowUp');
	const arrowDown = useKeyPress('ArrowDown');
	const arrowRight = useKeyPress('ArrowRight');
	const arrowLeft = useKeyPress('ArrowLeft');

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
				grid[i][j] = <Tile isActive={position.x === i && position.y === j} key={`${[ i, j ]}`} />;
			}
		}
		return grid;
	};

	if (arrowUp) {
		console.log(position.x);
		setPosition({ ...position, x: 1, y: 1 });
	}

	return <div style={style}>{renderBoard()}</div>;
};

export default Board;
