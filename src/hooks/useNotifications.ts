import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  DocumentData,
  QuerySnapshot
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useAuth } from "../context/AuthContext";
import { markNotificationAsRead, clearAllNotifications } from "../services/notifications.service";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  read: boolean;
  userId: string;
  createdAt: Date;
  data?: {
    reportId?: string;
    taskId?: string;
    [key: string]: any;
  };
}

interface UseNotificationsReturn {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  clearAll: () => Promise<void>;
  unreadCount: number;
}

export const useNotifications = (): UseNotificationsReturn => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Create a query for real-time notifications
    const notificationsQuery = query(
      collection(db, "notifications"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      notificationsQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const notificationsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        })) as Notification[];

        setNotifications(notificationsList);
        setLoading(false);
      },
      (err) => {
        console.error("Error getting notifications:", err);
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, [currentUser]);

  const markAsRead = async (id: string): Promise<void> => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
      setError(error instanceof Error ? error.message : String(error));
    }
  };

  const markAllAsRead = async (): Promise<void> => {
    try {
      const promises = notifications
        .filter((notification) => !notification.read)
        .map((notification) => markNotificationAsRead(notification.id));

      await Promise.all(promises);

      setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      setError(error instanceof Error ? error.message : String(error));
    }
  };

  const clearAll = async (): Promise<void> => {
    try {
      await clearAllNotifications();
      setNotifications([]);
    } catch (error) {
      console.error("Error clearing notifications:", error);
      setError(error instanceof Error ? error.message : String(error));
    }
  };

  return {
    notifications,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    clearAll,
    unreadCount: notifications.filter((n) => !n.read).length
  };
};