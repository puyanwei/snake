export const snakeReducer = (state, action) => {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case 'SNAKE_POSITION':
            return {
                ...state,
                snake: [payload]
            };
        case 'SNAKE_DIRECTION':
            return {
                ...state, direction: payload
            };
        case 'SNAKE_GROW':
            let blah = {
                ...state,
                snake: [...state.snake,
                    payload
                ]
            };
            console.log(blah);
            return blah;
        case 'TAIL_POSITION':
            return {
                ...state, tail: payload
            };
        case 'FOOD_POSITION':
            return {
                ...state, food: payload
            };
        case 'GAME_OVER':
            return {
                ...state, gameOver: payload
            };
        default:
            throw new Error();
    }
};