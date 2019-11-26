export const snakeReducer = (state, action) => {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case 'SNAKE_POSITION':
            return {
                ...state,
                snake: [{
                    x: payload.x,
                    y: payload.y
                }]
            };
        case 'TAIL_POSITION':
            return {
                ...state, tail: {
                    x: payload.x,
                    y: payload.y
                }
            };
        case 'FOOD_POSITION':
            return {
                ...state, food: {
                    x: payload.x,
                    y: payload.y
                }
            };
        case 'SNAKE_DIRECTION':
            return {
                ...state, direction: payload
            };
        case 'GAME_OVER':
            return {
                ...state, gameOver: payload
            };
        default:
            throw new Error();
    }
};