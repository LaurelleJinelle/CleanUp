import {
    collection,
    query,
    where,
    orderBy,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    writeBatch,
    serverTimestamp
  } from "firebase/firestore";
  import { db } from "../firebase-config";
  import { getCurrentUser } from "./auth.service";
  
  export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
    read: boolean;
    data?: any;
    createdAt: Date;
  }
  
  // Get all notifications for the current user
  export const getNotifications = async (filters: {
    read?: boolean;
  } = {}): Promise<Notification[]> => {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
  
      let notificationsQuery = query(
        collection(db, "notifications"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );
  
      if (filters.read === true) {
        notificationsQuery = query(
          notificationsQuery,
          where("read", "==", true)
        );
      } else if (filters.read === false) {
        notificationsQuery = query(
          notificationsQuery,
          where("read", "==", false)
        );
      }
  
      const querySnapshot = await getDocs(notificationsQuery);
  
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Notification[];
    } catch (error) {
      console.error("Error getting notifications:", error);
      throw error;
    }
  };
  
  // Mark a notification as read
  export const markNotificationAsRead = async (id: string, read = true): Promise<boolean> => {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
  
      const notificationDoc = await getDoc(doc(db, "notifications", id));
  
      if (!notificationDoc.exists()) {
        throw new Error("Notification not found");
      }
  
      const notificationData = notificationDoc.data();
  
      // Users can only update their own notifications
      if (notificationData.userId !== currentUser.uid) {
        throw new Error("You don't have permission to update this notification");
      }
  
      await updateDoc(doc(db, "notifications", id), {
        read
      });
  
      return true;
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  };
  
  // Mark all notifications as read
  export const markAllNotificationsAsRead = async (): Promise<boolean> => {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
  
      const notificationsQuery = query(
        collection(db, "notifications"),
        where("userId", "==", currentUser.uid),
        where("read", "==", false)
      );
  
      const querySnapshot = await getDocs(notificationsQuery);
      
      if (querySnapshot.empty) {
        return true;
      }
  
      const batch = writeBatch(db);
  
      querySnapshot.docs.forEach(doc => {
        batch.update(doc.ref, { read: true });
      });
  
      await batch.commit();
  
      return true;
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      throw error;
    }
  };
  
  // Clear all notifications
  export const clearAllNotifications = async (): Promise<boolean> => {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
  
      const notificationsQuery = query(
        collection(db, "notifications"),
        where("userId", "==", currentUser.uid)
      );
  
      const querySnapshot = await getDocs(notificationsQuery);
      
      if (querySnapshot.empty) {
        return true;
      }
  
      const batch = writeBatch(db);
  
      querySnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
  
      await batch.commit();
  
      return true;
    } catch (error) {
      console.error("Error clearing notifications:", error);
      throw error;
    }
  };