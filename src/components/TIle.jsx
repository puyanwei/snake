import React from 'react';

const Tile = ({ isActive }) => {
	const activeColour = isActive ? 'red' : 'buttonface';

	const style = {
		height: `2rem`,
		width: `2rem`,
		backgroundColor: activeColour
	};

	return <button style={style} />;
};

export default Tile;
