import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/userSlice';
import { User, LogOut } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      dispatch(login(username));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {isLoggedIn ? (
          <div className="text-center">
            <User className="mx-auto mb-4 text-blue-500" size={48} />
            <p className="text-2xl font-semibold mb-4">Welcome, {username}!</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 flex items-center justify-center w-full"
            >
              <LogOut className="mr-2" size={18} />
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <User className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;