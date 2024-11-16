import React from 'react';
import { useAuthStore } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

export default function GoogleSignIn() {
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    login('johndoe', '');
    navigate('/');
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="w-full bg-white text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
    >
      <img
        src="https://www.google.com/favicon.ico"
        alt="Google"
        className="w-5 h-5"
      />
      <span>Sign in with Google</span>
    </button>
  );
}