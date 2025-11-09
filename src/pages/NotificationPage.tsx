// pages/NotificationsPage.tsx
import React, { useState } from 'react';
import { FiBell, FiCheck, FiTrash2, FiSettings, FiUser, FiMessageCircle, FiAward } from 'react-icons/fi';

interface Notification {
  id: string;
  type: 'connection' | 'message' | 'job' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'connection',
      title: 'New Connection Request',
      message: 'Sarah Johnson wants to connect with you',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      read: false,
      actionUrl: '/network'
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'James Wilson sent you a message',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      read: false,
      actionUrl: '/chat'
    },
    {
      id: '3',
      type: 'job',
      title: 'Job Match',
      message: 'New position at Emirates matches your profile',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: true,
      actionUrl: '/jobs'
    },
    {
      id: '4',
      type: 'system',
      title: 'CV Analysis Complete',
      message: 'Your CV has been analyzed with 85% score',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'connection':
        return <FiUser className="text-blue-500" />;
      case 'message':
        return <FiMessageCircle className="text-green-500" />;
      case 'job':
        return <FiAward className="text-purple-500" />;
      case 'system':
        return <FiBell className="text-orange-500" />;
      default:
        return <FiBell className="text-gray-500" />;
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-emirates font-bold text-black mb-3">
          Notifications
        </h1>
        <p className="text-gray-600 font-montessart text-lg">
          Stay updated with your aviation career activities
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#423772] rounded-xl flex items-center justify-center">
                <FiBell className="text-2xl text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 font-emirates">
                  Your Notifications
                </h2>
                <p className="text-gray-600 font-montessart">
                  {unreadCount} unread of {notifications.length} total
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 bg-[#423772] text-white px-4 py-2 rounded-lg font-montessart font-semibold hover:bg-[#312456] transition-colors"
                >
                  <FiCheck className="text-lg" />
                  Mark All Read
                </button>
              )}
              <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-montessart font-semibold hover:bg-gray-200 transition-colors">
                <FiSettings className="text-lg" />
                Settings
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-6 transition-all ${
                      notification.read ? 'bg-white' : 'bg-blue-50 border-l-4 border-l-blue-500'
                    } hover:bg-gray-50`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className={`font-semibold font-montessart ${
                              notification.read ? 'text-gray-800' : 'text-gray-900'
                            }`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-montessart font-semibold">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 font-montessart mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="text-gray-400 font-montessart text-sm">
                              {getTimeAgo(notification.timestamp)}
                            </span>
                            {notification.actionUrl && (
                              <button className="text-[#423772] font-montessart text-sm font-semibold hover:text-[#312456] transition-colors">
                                View
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 hover:bg-green-200 transition-colors"
                            title="Mark as read"
                          >
                            <FiCheck className="text-sm" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-200 transition-colors"
                          title="Delete notification"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <FiBell className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-montessart text-lg mb-2">
                  No notifications yet
                </p>
                <p className="text-gray-400 font-montessart text-sm">
                  Your notifications will appear here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 space-y-6">
          {/* Notification Stats */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-800 font-montessart mb-4">
              Notification Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-montessart">Unread</span>
                <span className="text-2xl font-bold text-blue-600 font-emirates">{unreadCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-montessart">Today</span>
                <span className="text-xl font-bold text-gray-800 font-emirates">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-montessart">This Week</span>
                <span className="text-xl font-bold text-gray-800 font-emirates">12</span>
              </div>
            </div>
          </div>

          {/* Quick Settings */}
          <div className="bg-gradient-to-br from-[#423772] to-[#6D5BA6] rounded-2xl p-6 text-white">
            <h3 className="font-semibold font-montessart mb-3">Notification Settings</h3>
            <p className="text-white/80 font-montessart text-sm mb-4">
              Control how you receive notifications
            </p>
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm font-montessart">
                <input type="checkbox" defaultChecked className="rounded text-[#423772]" />
                Email Notifications
              </label>
              <label className="flex items-center gap-3 text-sm font-montessart">
                <input type="checkbox" defaultChecked className="rounded text-[#423772]" />
                Push Notifications
              </label>
              <label className="flex items-center gap-3 text-sm font-montessart">
                <input type="checkbox" defaultChecked className="rounded text-[#423772]" />
                Connection Requests
              </label>
              <label className="flex items-center gap-3 text-sm font-montessart">
                <input type="checkbox" defaultChecked className="rounded text-[#423772]" />
                Job Matches
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;