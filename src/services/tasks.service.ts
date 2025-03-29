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
  import { db } from "../firebase-config";
  import { getCurrentUser } from "./auth.service";
  
  export interface Task {
    id?: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignedWorkerId: string;
    reportId?: string;
    notes?: string;
    dueDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  // Get all tasks with optional filters
  export const getTasks = async (filters: {
    status?: string;
    workerId?: string;
  } = {}): Promise<Task[]> => {
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
  
      // If user is a worker, they can only see their assigned tasks
      if (currentUser.role === "worker") {
        queryConstraints.push(where("assignedWorkerId", "==", currentUser.uid));
      } else if (filters.workerId) {
        queryConstraints.push(where("assignedWorkerId", "==", filters.workerId));
      }
  
      // Order by creation date
      queryConstraints.push(orderBy("createdAt", "desc"));
  
      const q = query(collection(db, "tasks"), ...queryConstraints);
      const querySnapshot = await getDocs(q);
  
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
          dueDate: data.dueDate?.toDate()
        } as Task;
      });
    } catch (error) {
      console.error("Error getting tasks:", error);
      throw error;
    }
  };
  
  // Get a single task by ID
  export const getTaskById = async (id: string): Promise<Task> => {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
  
      const docRef = doc(db, "tasks", id);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        throw new Error("Task not found");
      }
  
      const data = docSnap.data();
  
      // Check if user has permission to view this task
      if (currentUser.role === "worker" && data.assignedWorkerId !== currentUser.uid) {
        throw new Error("You don't have permission to view this task");
      }
  
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        dueDate: data.dueDate?.toDate()
      } as Task;
    } catch (error) {
      console.error("Error getting task:", error);
      throw error;
    }
  };
  
  // Create a new task
  export const createTask = async (taskData: {
    title: string;
    description: string;
    assignedWorkerId: string;
    reportId?: string;
    priority?: string;
    dueDate?: Date;
  }): Promise<Task> => {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
  
      // Only officials can create tasks
      if (currentUser.role !== "official") {
        throw new Error("You don't have permission to create tasks");
      }
  
      const newTask = {
        ...taskData,
        status: "assigned",
        priority: taskData.priority || "medium",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        dueDate: taskData.dueDate ? taskData.dueDate : null
      };
  
      const docRef = await addDoc(collection(db, "tasks"), newTask);
  
      // If task is associated with a report, update the report status
      if (taskData.reportId) {
        const reportRef = doc(db, "reports", taskData.reportId);
        await updateDoc(reportRef, {
          status: "in_progress",
          assignedWorkerId: taskData.assignedWorkerId,
          updatedAt: serverTimestamp()
        });
      }
  
      return {
        id: docRef.id,
        ...newTask,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Task;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };
  
  // Update a task
  export const updateTask = async (id: string, updateData: Partial<Task>): Promise<Task> => {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
  
      const taskDoc = await getDoc(doc(db, "tasks", id));
  
      if (!taskDoc.exists()) {
        throw new Error("Task not found");
      }
  
      const taskData = taskDoc.data();
  
      // Workers can only update status and notes of their own tasks
      // Officials can update any task
      if (currentUser.role === "worker" && taskData.assignedWorkerId !== currentUser.uid) {
        throw new Error("You don't have permission to update this task");
      }
  
      const dataToUpdate: any = {
        updatedAt: serverTimestamp(),
      };
  
      if (currentUser.role === "worker") {
        // Workers can only update status and notes
        if (updateData.status) dataToUpdate.status = updateData.status;
        if (updateData.notes) dataToUpdate.notes = updateData.notes;
      } else {
        // Officials can update everything
        if (updateData.status) dataToUpdate.status = updateData.status;
        if (updateData.notes) dataToUpdate.notes = updateData.notes;
        if (updateData.assignedWorkerId) dataToUpdate.assignedWorkerId = updateData.assignedWorkerId;
        if (updateData.priority) dataToUpdate.priority = updateData.priority;
        if (updateData.dueDate) dataToUpdate.dueDate = updateData.dueDate;
      }
  
      await updateDoc(doc(db, "tasks", id), dataToUpdate);
  
      // If task status is updated to completed and there's an associated report,
      // update the report status to resolved
      if (updateData.status === "completed" && taskData.reportId) {
        await updateDoc(doc(db, "reports", taskData.reportId), {
          status: "resolved",
          updatedAt: serverTimestamp(),
        });
      }
  
      // Get updated task
      return await getTaskById(id);
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };
  
  // Delete a task
  export const deleteTask = async (id: string): Promise<boolean> => {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
  
      // Only officials can delete tasks
      if (currentUser.role !== "official") {
        throw new Error("You don't have permission to delete this task");
      }
  
      await deleteDoc(doc(db, "tasks", id));
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };