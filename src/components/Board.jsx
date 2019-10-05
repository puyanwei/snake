import React from 'react';

import Tile from './TIle';

const Board = ({ rows, cols }) => {
    const style = {
        maxHeight: `${2 * rows}rem`,
        maxWidth: `${2 * cols}rem`,
        margin: "0 auto",
        paddingTop: "4rem"
    };

    const createGrid = () => Array.from(Array(rows), () => new Array(cols).fill(<Tile />));

    return <div style={style}>{createGrid()}</div>;
};

export default Board;
