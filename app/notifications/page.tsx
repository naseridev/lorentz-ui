'use client';

import { motion } from 'framer-motion';

import Navbar from '@/app/components/basics/Navbar';

export default function NotificationsPage() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar
        menuItems={[
          {
            label: 'TimeLine',
            href: '/',
            className: 'group-hover:bg-white'
          },
          {
            label: 'Profile',
            href: '/profile',
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
    </motion.div>
  );
}
