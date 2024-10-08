import React, { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../api';
import { Trophy, Medal, User, Loader } from 'lucide-react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateLeaderboard = async () => {
      try {
        const data = await fetchLeaderboard();
        setLeaderboard(data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        setError('Failed to load leaderboard. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    updateLeaderboard();
    const interval = setInterval(updateLeaderboard, 5000);  // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getMedalIcon = (index) => {
    switch(index) {
      case 0: return <Trophy className="text-yellow-400" size={24} />;
      case 1: return <Medal className="text-gray-400" size={24} />;
      case 2: return <Medal className="text-yellow-600" size={24} />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center py-4 bg-blue-600 text-white rounded-t-lg">
        Leaderboard
      </h2>
      <div className="h-60 overflow-y-auto">
        {error|| leaderboard == null ? (
          <p className="text-center py-4 text-red-500">{error}</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {(loading ? Array(5).fill({}) : leaderboard).map((entry, index) => (
              <li key={index} className="flex items-center justify-between py-3 px-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <span className="w-8 text-center font-semibold text-gray-500">
                    {getMedalIcon(index) || `#${index + 1}`}
                  </span>
                  <User className="ml-2 mr-3 text-gray-400" size={20} />
                  <span className="font-medium w-24">
                    {loading ? (
                      <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      entry.username
                    )}
                  </span>
                </div>
                <span className="font-semibold text-blue-600 w-16 text-right">
                  {loading ? (
                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    `${entry.points} pts`
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <Loader className="animate-spin text-blue-600" size={40} />
        </div>
      )}
    </div>
  );
};

export default Leaderboard;