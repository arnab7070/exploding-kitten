import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startGame, drawCard, loadSavedGame } from '../redux/gameSlice';
import { PlayCircle, RefreshCw, CreditCard } from 'lucide-react';

const Game = () => {
  const dispatch = useDispatch();
  const { isGameStarted, isGameOver, message, deck } = useSelector((state) => state.game);
  const { username, isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadSavedGame(username));
    }
  }, [dispatch, isLoggedIn, username]);

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-xl text-gray-800 font-semibold">Please log in to play the game.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Card Game</h2>
        
        {!isGameStarted && (
          <button
            onClick={() => dispatch(startGame())}
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors duration-300 flex items-center justify-center w-full"
          >
            <PlayCircle className="mr-2" size={24} />
            Start Game
          </button>
        )}
        
        {isGameStarted && !isGameOver && (
          <div className="space-y-4">
            <p className="text-xl font-semibold text-gray-700">Cards left: {deck.length}</p>
            <button
              onClick={() => dispatch(drawCard(username))}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center w-full"
            >
              <CreditCard className="mr-2" size={24} />
              Draw Card
            </button>
          </div>
        )}
        
        {message && (
          <p className="mt-4 text-lg font-medium text-gray-700 bg-gray-100 p-3 rounded-md">
            {message}
          </p>
        )}
        
        {isGameOver && (
          <button
            onClick={() => dispatch(startGame())}
            className="mt-4 bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center w-full"
          >
            <RefreshCw className="mr-2" size={24} />
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default Game;