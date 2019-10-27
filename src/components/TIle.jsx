import React from 'react';

const Tile = ({ isActive, isFood }) => {
    let buttonColor;

    if (isActive) {
        buttonColor = 'red'
    }
    else if (isFood) {
        buttonColor = 'black'
    } else {
        buttonColor = 'buttonface'
    }

    const style = {
        height: `2rem`,
        width: `2rem`,
        backgroundColor: buttonColor
    };

    return <button style={style} />;
};

export default Tile;
