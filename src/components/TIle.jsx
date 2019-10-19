import React from 'react';

const Tile = ({ isActive }) => {
	const style = {
		height: `2rem`,
		width: `2rem`,
		backgroundColor: `${isActive && 'red'}`
	};

	return <button style={style} />;
};

export default Tile;
