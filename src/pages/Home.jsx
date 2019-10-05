import React from 'react';

import Board from '../components/Board';

const Home = () => {
    return (
        <>
            <Board rows={20} cols={15} />
            {/* keep rows even, cols odd or middle will fuck up */}
        </>
    );
};

export default Home;
