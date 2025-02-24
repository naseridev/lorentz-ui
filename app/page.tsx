'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import Navbar from '@/app/components/basics/Navbar';
import Post from '@/app/components/basics/Post';
import Toast from '@/app/components/basics/Toast';

import NotificationWidget from '@/app/components/widgets/NotificationWidget';
import ProfileWidget from '@/app/components/widgets/ProfileWidget';


// Mock data for posts
const posts = [
  {
    content: "This is a new random post content about technology and its impact on society.",
    author: "Sara Davoodi",
    date: "10 June 2024",
    initialLikes: 12,
    initialDislikes: 3,
    postId: '0xa3f',
  },
  {
    content: "Exploring the wonders of the natural world and its hidden secrets.",
    author: "Ali Rezaei",
    date: "11 June 2024",
    initialLikes: 8,
    initialDislikes: 5,
    postId: '0xbc1',
  },
  {
    content: "The future of artificial intelligence and its role in our daily lives.",
    author: "Leila Hosseini",
    date: "9 June 2024",
    initialLikes: 15,
    initialDislikes: 2,
    postId: '0xf34',
  },
  {
    content: "A deep dive into the history of ancient civilizations and their mysteries.",
    author: "Mohammad Ahmadi",
    date: "10 June 2024",
    initialLikes: 9,
    initialDislikes: 6,
    postId: '0xd91',
  },
  {
    content: "Understanding the complexities of modern economics and global trade.",
    author: "Reza Karimi",
    date: "8 June 2024",
    initialLikes: 11,
    initialDislikes: 7,
    postId: '0xe27',
  },
];

export default function Home() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Navbar component */}
      <Navbar
        menuItems={[
          {
            label: 'Profile',
            href: '/profile',
            className: 'group-hover:bg-white'
          },
          {
            label: 'Notifications',
            href: '/notifications',
            className: 'group-hover:bg-white'
          },
          {
            label: 'Settings',
            href: '/settings',
            className: 'group-hover:bg-white'
          },
          {
            label: 'Logout',
            href: '/logout',
            className: 'text-red-600 group-hover:bg-red-600 group-hover:text-white',
          },
        ]}
      />

      {/* Main content */}
      <div className="container mx-auto pt-[100px] flex flex-col lg:flex-row justify-between px-4 md:px-8 lg:px-16 md:space-x-4 lg:space-x-4">
        <div className="lg:w-3/4 mt-4 lg:mt-0">
          {posts.map((post) => (
            <Post
              key={post.postId}
              content={post.content}
              author={post.author}
              date={post.date}
              initialLikes={post.initialLikes}
              initialDislikes={post.initialDislikes}
              postId={post.postId}
            />
          ))}
        </div>

        {/* Widgets section */}
        <aside className="hidden lg:flex lg:w-1/4 custom:w-2/4 lg:sticky lg:top-[100px] h-[calc(100vh-100px)] flex-col space-y-6">
          <Link href="/profile" aria-label="Profile">
            <ProfileWidget name="Nima Naseri" id="nima#lorentz" />
          </Link>
          <Link href="/notifications" aria-label="Notifications">
            <NotificationWidget
              data={[
                'You have 3 new notifications',
                'Your friend posted a new update',
                'A new event has been added to your calendar',
                'A new event has been added to your calendar',
                'A new event has been added to your calendar',
                'A new event has been added to your calendar',
                'A new event has been added to your calendar',
                'A new event has been added to your calendar',
                'A new event has been added to your calendar',
                'A new event has been added to your calendar',
                'A new event has been added to your calendar',
                'A new event has been added to your calendar',
              ]}
            />
          </Link>
        </aside>
      </div>
    </motion.div>
  );
}
