export const snakeReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'BOARD_STATE':
            return { ...state, boardState: payload };
        // case 'SET_PLAYER_CHOICE':
        //     return { ...state, choice: { ...state.choice, playerChoice: payload } };
        // case 'SET_COMPUTER_CHOICE':
        //     return { ...state, choice: { ...state.choice, computerChoice: payload } };
        // case 'PLAYER_WINS':
        //     return { ...state, scores: { ...state.scores, playerScore: state.scores.playerScore + 1 } };
        // case 'COMPUTER_WINS':
        //     return { ...state, scores: { ...state.scores, computerScore: state.scores.computerScore + 1 } };
        default:
            throw new Error();
    }
};