'use client';

import { useState, useMemo, useCallback } from 'react';
import { FiThumbsUp, FiThumbsDown, FiShare, FiBookmark } from 'react-icons/fi';
import { useSpring, animated } from 'react-spring';
import Toast from '@/app/components/basics/Toast';
import { log } from 'console';

type Status = 'like' | 'dislike' | null;

interface PostProps {
  content: string;
  author: string;
  date: string;
  initialLikes: number;
  initialDislikes: number;
  postId: string;
}

export default function Post({ content, author, date, initialLikes, initialDislikes, postId }: PostProps) {
  const [status, setStatus] = useState<Status>(null);
  const [saved, setSaved] = useState(false);

  const { likes, dislikes } = useMemo(() => {
    const likes = status === 'like' ? initialLikes + 1 : initialLikes;
    const dislikes = status === 'dislike' ? initialDislikes + 1 : initialDislikes;
    return { likes, dislikes };
  }, [status, initialLikes, initialDislikes]);

  const [props, set] = useSpring(() => ({
    transform: 'scale(1)',
  }));

  const triggerAnimation = useCallback(() => {
    set({ transform: 'scale(1.1)' });
    setTimeout(() => set({ transform: 'scale(1)' }), 100);
  }, [set]);

  const handleLike = () => {
    triggerAnimation();
    setStatus(prevStatus => (prevStatus === 'like' ? null : 'like'));
  };

  const handleDislike = () => {
    triggerAnimation();
    setStatus(prevStatus => (prevStatus === 'dislike' ? null : 'dislike'));
  };

  const handleShare = async () => {
    triggerAnimation();
    const shareData = {
      title: 'Check out this post!',
      text: 'I found this interesting. Check it out!',
      url: window.location.href + '#' + postId,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        console.log(shareData.title);
        console.log(shareData.text);
        console.log(shareData.url);
      }
    } catch (err) {
      console.error('Failed to share or copy link: ', err);
    }
  };

  const handleSave = () => {
    triggerAnimation();
    setSaved(prevSaved => !prevSaved);
  };

  return (
    <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border border-gray-600 rounded-lg p-6 max-w-xl mx-auto mb-6 shadow-lg transform transition-transform">
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3">
          {author.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="text-lg font-semibold text-white">{author}</div>
          <div className="text-sm text-gray-400">{date}</div>
        </div>
      </div>
      <p className="text-white mb-4 leading-relaxed">{content}</p>
      <div className="flex justify-between items-center mt-6 space-x-4">
        <animated.button
          style={props}
          className={`relative inline-flex items-center justify-center p-4 px-6 py-3 text-sm overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-lg group ${status === 'like' ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          onClick={handleLike}
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <FiThumbsUp className="mr-2" /> {likes}
          </span>
          <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">
            {status === 'like' ? 'Liked' : 'Like'}
          </span>
          <span className="relative invisible">Like</span>
        </animated.button>

        <animated.button
          style={props}
          className={`relative inline-flex items-center justify-center p-4 px-6 py-3 text-sm overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-lg group ${status === 'dislike' ? 'bg-red-700 text-white' : 'bg-red-600 text-white hover:bg-red-700'}`}
          onClick={handleDislike}
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <FiThumbsDown className="mr-2" /> {dislikes}
          </span>
          <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">
            {status === 'dislike' ? 'Disliked' : 'Dislike'}
          </span>
          <span className="relative invisible">Dislike</span>
        </animated.button>

        <animated.button
          style={props}
          className="relative inline-flex items-center justify-center p-4 px-6 py-3 text-sm overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-lg group bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleShare}
        >
          <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">
            Share
          </span>
          <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <FiShare />
          </span>
          <span className="relative invisible">Share</span>
        </animated.button>

        <animated.button
          style={props}
          className={`relative inline-flex items-center justify-center p-4 px-6 py-3 text-sm overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-lg group ${saved ? 'bg-red-700 text-white' : 'bg-red-600 text-white hover:bg-red-700'}`}
          onClick={handleSave}
        >
          <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">
            {saved ? 'Saved' : 'Save'}
          </span>
          <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <FiBookmark />
          </span>
          <span className="relative invisible">Save</span>
        </animated.button>
      </div>
    </div>
  );
}
function setToastVisible(arg0: boolean) {
  throw new Error('Function not implemented.');
}

