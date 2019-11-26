export const snakeReducer = (state, action) => {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case 'SNAKE':
            return {
                ...state,
                snake: [{
                    x: payload.x,
                    y: payload.y
                }]
            };
        case 'TAIL':
            return {
                ...state, tail: {
                    x: payload.x,
                    y: payload.y
                }
            };
        case 'FOOD':
            return {
                ...state, food: {
                    x: payload.x,
                    y: payload.y
                }
            };
        case 'DIRECTION':
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