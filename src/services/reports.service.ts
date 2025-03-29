import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    serverTimestamp,
    QueryConstraint
  } from "firebase/firestore";
  import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
  import { db, storage } from "../firebase-config";
  import { getCurrentUser } from "./auth.service";
  
  export interface Report {
    id?: string;
    title: string;
    description: string;
    location: string;
    imageUrl?: string;
    latitude?: number;
    longitude?: number;
    status: string;
    userId: string;
    assignedWorkerId?: string;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  // Get all reports with optional filters
  export const getReports = async (filters: {
    status?: string;
    userId?: string;
  } = {}): Promise<Report[]> => {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
  
      const queryConstraints: QueryConstraint[] = [];
  
      // Apply filters
      if (filters.status) {
        queryConstraints.push(where("status", "==", filters.status));
      }
  
      if (filters.userId) {
        queryConstraints.push(where("userId", "==", filters.userId));
      }
  
      // If user is a resident, they can only see their own reports
      if (currentUser.role === "resident") {
        queryConstraints.push(where("userId", "==", currentUser.uid));
      }
  
      // Order by creation date
      queryConstraints.push(orderBy("createdAt", "desc"));
  
      const q = query(collection(db, "reports"), ...queryConstraints);
      const querySnapshot = await getDocs(q);
  
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as Report;
      });
    } catch (error) {
      console.error("Error getting reports:", error);
      throw error;
    }
  };
  
  // Get a single report by ID
  export const getReportById = async (id: string): Promise<Report> => {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
  
      const docRef = doc(db, "reports", id);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        throw new Error("Report not found");
      }
  
      const data = docSnap.data();
  
      // Check if user has permission to view this report
      if (currentUser.role === "resident" && data.userId !== currentUser.uid) {
        throw new Error("You don't have permission to view this report");
      }
  
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      } as Report;
    } catch (error) {
      console.error("Error getting report:", error);
      throw error;
    }
  };
  
  // Create a new report
  export const createReport = async (
    reportData: {
      title: string;
      description: string;
      location: string;
      latitude?: number;
      longitude?: number;
    },
    imageFile?: File
  ): Promise<Report> => {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
  
      let imageUrl = null;
  
      // Upload image if provided
      if (imageFile) {
        const storageRef = ref(storage, `reports/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }
  
      const newReport = {
        ...reportData,
        imageUrl,
        status: "pending",
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
  
      const docRef = await addDoc(collection(db, "reports"), newReport);
  
      return {
        id: docRef.id,
        ...newReport,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Report;
    } catch (error) {
      console.error("Error creating report:", error);
      throw error;
    }
  };
  
  // Update a report
  export const updateReport = async (id: string, updateData: Partial<Report>): Promise<Report> => {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
  
      // Only officials and workers can update reports
      if (currentUser.role !== "official" && currentUser.role !== "worker") {
        throw new Error("You don't have permission to update this report");
      }
  
      const reportRef = doc(db, "reports", id);
      
      // Remove fields that shouldn't be updated directly
      const { id: _, createdAt, updatedAt, userId, ...dataToUpdate } = updateData;
  
      await updateDoc(reportRef, {
        ...dataToUpdate,
        updatedAt: serverTimestamp()
      });
  
      // Get the updated report
      return await getReportById(id);
    } catch (error) {
      console.error("Error updating report:", error);
      throw error;
    }
  };
  
  // Delete a report
  export const deleteReport = async (id: string): Promise<boolean> => {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
  
      // Only officials can delete reports
      if (currentUser.role !== "official") {
        throw new Error("You don't have permission to delete this report");
      }
  
      await deleteDoc(doc(db, "reports", id));
      return true;
    } catch (error) {
      console.error("Error deleting report:", error);
      throw error;
    }
  };