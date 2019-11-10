export const snakeReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        // case 'SNAKE':
        // 	return { ...state, x: payload.x, y: payload.y };
        // case 'PREV':
        // 	return { ...state, boardState: payload };
        // case 'FOOD':
        // 	return { ...state, boardState: payload };
        case 'DIRECTION':
            console.log(payload);
            return { ...state, direction: payload };
        case 'GAME_OVER':
            return { ...state, gameOver: payload };
        default:
            throw new Error();
    }
};
