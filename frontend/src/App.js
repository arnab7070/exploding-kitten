import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Game from './components/Game';
import Login from './components/Login';
import Leaderboard from './components/Leaderboard';
import { Cat } from 'lucide-react';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-800 flex flex-col">
        <header className="bg-gray-800 py-4 px-6 shadow-md">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center">
            <Cat className="mr-2" size={32} />
            Exploding Kitten
          </h1>
        </header>
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row items-stretch gap-8">
          <div className="flex-1 min-w-0">
            <Login />
          </div>
          <div className="flex-1 min-w-0">
            <Game />
          </div>
          <div className="flex-1 min-w-0">
            <Leaderboard />
          </div>
        </main>
        <footer className="bg-gray-800 border-t text-white py-4 px-6 mt-auto">
          <p className="text-center text-sm">
            © 2023 Exploding Kitten. All rights reserved.
          </p>
        </footer>
      </div>
    </Provider>
  );
}

export default App;