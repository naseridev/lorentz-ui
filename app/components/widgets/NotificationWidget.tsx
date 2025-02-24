'use client';

import { useState, useCallback } from 'react';
import { FiX } from 'react-icons/fi';

type NotificationProps = {
  data: string[];
};

type NotificationItemProps = {
  notification: string;
  onRemove: () => void;
};

// NotificationItem component
const NotificationItem = ({
  notification,
  onRemove,
}: NotificationItemProps) => (
  <li
    className="flex justify-between items-center p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-300"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
  >
    <span className="text-sm text-gray-300">{notification}</span>
    <FiX
      aria-label="Remove notification"
      className="h-5 w-5 text-gray-400 cursor-pointer transition-colors duration-300"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onRemove();
      }}
    />
  </li>
);

export default function NotificationWidget({ data }: NotificationProps) {
  const [notifications, setNotifications] = useState<string[]>(data);

  const removeNotification = useCallback((index: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((_, i) => i !== index)
    );
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border border-gray-600 text-white p-4 rounded-lg max-w-sm">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      {notifications.length > 0 ? (
        <ul className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar custom-scrollbar-padding rounded-lg">
          {notifications.map((notification, index) => (
            <NotificationItem
              key={index}
              notification={notification}
              onRemove={() => removeNotification(index)}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No notifications available</p>
      )}
    </div>

  );
}
