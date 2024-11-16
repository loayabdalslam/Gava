import React from 'react';
import { Star, Users } from 'lucide-react';
import { useGamificationStore } from '../store/gamification';
import { User } from '../types';

interface Props {
  user: User;
  isCurrentUser: boolean;
  onFollow?: () => void;
  isFollowing?: boolean;
}

export default function UserProfile({ user, isCurrentUser, onFollow, isFollowing }: Props) {
  const { score, level, badges } = useGamificationStore();

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-start space-x-4">
        <img
          src={user.avatar}
          alt={user.username}
          className="w-20 h-20 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{user.username}</h2>
            {!isCurrentUser && (
              <button
                onClick={onFollow}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isFollowing
                    ? 'bg-gray-600 hover:bg-gray-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>
          <p className="text-gray-400 mt-2">{user.bio}</p>
          
          <div className="flex items-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <Users size={20} />
              <span>{user.followers.length} followers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={20} />
              <span>{user.following.length} following</span>
            </div>
          </div>

          {isCurrentUser && (
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Level {level}</h3>
                  <p className="text-gray-400">Score: {score} points</p>
                </div>
                <div className="flex space-x-2">
                  {badges.map((badge) => (
                    <div
                      key={badge}
                      className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center"
                      title={badge}
                    >
                      <Star size={16} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-blue-500 rounded-full h-2"
                  style={{
                    width: `${(score % 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}