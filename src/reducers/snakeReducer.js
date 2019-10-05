export const snakeReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'ROWS':
            return { ...state, rows: payload };
        case 'COLS':
            return { ...state, cols: payload };
        case 'BOARD_STATE':
            return { ...state, boardState: payload };
        default:
            throw new Error();
    }
};