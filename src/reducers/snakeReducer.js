export const snakeReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'POSITION':
			console.log(payload);
			return { ...state, x: payload.x, y: payload.y };
		case 'BOARD_STATE':
			return { ...state, boardState: payload };
		default:
			throw new Error();
	}
};
