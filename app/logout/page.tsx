'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LogoutingPage() {
  const [text, setText] = useState('');
  const fullText = 'Logouting...';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.slice(0, currentIndex + 1));
      currentIndex++;
    }, Math.floor(Math.random() * (200 - 151)) + 150);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >

      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="lg:text-4xl text-2xl font-bold text-red-600 mb-4">{text}</h1>
      </div>

    </motion.div>
  );
}
