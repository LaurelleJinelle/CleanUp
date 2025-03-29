import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import * as express from "express"
import * as cors from "cors"
import axios from "axios"

// Initialize Firebase Admin
admin.initializeApp()
const db = admin.firestore()

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string
        email: string
        role?: string
      }
    }
  }
}

// Create Express app
const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

// Authentication middleware
const authenticate = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    const token = authHeader.split("Bearer ")[1]
    const decodedToken = await admin.auth().verifyIdToken(token)

    // Get user data from Firestore to include role
    const userDoc = await db.collection("users").doc(decodedToken.uid).get()

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || "",
      role: userDoc.exists ? userDoc.data()?.role : "resident",
    }

    next()
  } catch (error) {
    console.error("Authentication error:", error)
    res.status(401).json({ error: "Unauthorized" })
  }
}

// Role-based authorization middleware
const authorize = (roles: string[]) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    if (!roles.includes(req.user.role || "")) {
      return res.status(403).json({ error: "Forbidden" })
    }

    next()
  }
}

// API Routes

// Reports
app.get("/reports", authenticate, async (req, res) => {
  try {
    const reportsSnapshot = await db.collection("reports").orderBy("createdAt", "desc").get()

    const reports = reportsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    res.status(200).json(reports)
  } catch (error) {
    console.error("Error fetching reports:", error)
    res.status(500).json({ error: "Failed to fetch reports" })
  }
})

app.post("/reports", authenticate, async (req, res) => {
  try {
    const { title, description, location, images } = req.body

    if (!title || !description || !location) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const reportData = {
      title,
      description,
      location,
      images: images || [],
      status: "pending",
      userId: req.user.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }

    const reportRef = await db.collection("reports").add(reportData)

    // Create notification for officials
    const officialsSnapshot = await db.collection("users").where("role", "==", "official").get()

    const notificationPromises = officialsSnapshot.docs.map((doc) => {
      return db.collection("notifications").add({
        userId: doc.id,
        title: "New Report",
        message: `A new report "${title}" has been submitted`,
        type: "info",
        read: false,
        data: { reportId: reportRef.id },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })
    })

    await Promise.all(notificationPromises)

    res.status(201).json({
      id: reportRef.id,
      ...reportData,
    })
  } catch (error) {
    console.error("Error creating report:", error)
    res.status(500).json({ error: "Failed to create report" })
  }
})

// Tasks
app.get("/tasks", authenticate, async (req, res) => {
  try {
    let tasksQuery = db.collection("tasks").orderBy("createdAt", "desc")

    // Filter by assignee if not an official
    if (req.user.role !== "official") {
      tasksQuery = tasksQuery.where("assigneeId", "==", req.user.uid)
    }

    const tasksSnapshot = await tasksQuery.get()

    const tasks = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    res.status(200).json(tasks)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    res.status(500).json({ error: "Failed to fetch tasks" })
  }
})

app.post("/tasks", authenticate, authorize(["official"]), async (req, res) => {
  try {
    const { title, description, assigneeId, dueDate, priority, reportId, location } = req.body

    if (!title || !description || !assigneeId) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Verify assignee exists
    const assigneeDoc = await db.collection("users").doc(assigneeId).get()
    if (!assigneeDoc.exists) {
      return res.status(400).json({ error: "Assignee does not exist" })
    }

    const taskData = {
      title,
      description,
      assigneeId,
      reportId: reportId || null,
      location: location || null,
      status: "assigned",
      priority: priority || "medium",
      dueDate: dueDate ? new Date(dueDate) : null,
      createdBy: req.user.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }

    const taskRef = await db.collection("tasks").add(taskData)

    // Create notification for assignee
    await db.collection("notifications").add({
      userId: assigneeId,
      title: "New Task Assigned",
      message: `You have been assigned a new task: "${title}"`,
      type: "info",
      read: false,
      data: { taskId: taskRef.id },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    // Update report status if linked to a report
    if (reportId) {
      await db.collection("reports").doc(reportId).update({
        status: "in_progress",
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })
    }

    res.status(201).json({
      id: taskRef.id,
      ...taskData,
    })
  } catch (error) {
    console.error("Error creating task:", error)
    res.status(500).json({ error: "Failed to create task" })
  }
})

// Route optimization
app.post("/routes/optimize", authenticate, async (req, res) => {
  try {
    const { origin, destinations } = req.body

    if (!origin || !destinations || !destinations.length) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Get Google Maps API key from environment
    const apiKey = functions.config().google?.maps?.key
    if (!apiKey) {
      return res.status(500).json({ error: "Google Maps API key not configured" })
    }

    // Build the request to Google Maps Directions API
    const waypoints = destinations.map((dest) => `${dest.lat},${dest.lng}`).join("|")
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${origin.lat},${origin.lng}&waypoints=optimize:true|${waypoints}&key=${apiKey}`

    const response = await axios.get(url)

    if (response.data.status !== "OK") {
      throw new Error(`Google Maps API error: ${response.data.status}`)
    }

    // Extract the optimized route
    const route = response.data.routes[0]
    const optimizedWaypoints = response.data.routes[0].waypoint_order.map((index) => destinations[index])

    res.status(200).json({
      route: {
        distance: route.legs.reduce((sum, leg) => sum + leg.distance.value, 0),
        duration: route.legs.reduce((sum, leg) => sum + leg.duration.value, 0),
        path: decodePolyline(route.overview_polyline.points),
      },
      waypoints: optimizedWaypoints,
    })
  } catch (error) {
    console.error("Error optimizing route:", error)
    res.status(500).json({ error: "Failed to optimize route" })
  }
})

// Helper function to decode Google's polyline format
function decodePolyline(encoded: string): Array<{ lat: number; lng: number }> {
  const poly: Array<{ lat: number; lng: number }> = []
  let index = 0,
    lat = 0,
    lng = 0

  while (index < encoded.length) {
    let b,
      shift = 0,
      result = 0

    do {
      b = encoded.charCodeAt(index++) - 63
      result |= (b & 0x1f) << shift
      shift += 5
    } while (b >= 0x20)

    const dlat = result & 1 ? ~(result >> 1) : result >> 1
    lat += dlat

    shift = 0
    result = 0

    do {
      b = encoded.charCodeAt(index++) - 63
      result |= (b & 0x1f) << shift
      shift += 5
    } while (b >= 0x20)

    const dlng = result & 1 ? ~(result >> 1) : result >> 1
    lng += dlng

    poly.push({
      lat: lat * 1e-5,
      lng: lng * 1e-5,
    })
  }

  return poly
}

// Export the Express app as a Firebase Function
export const api = functions.https.onRequest(app)

// Cloud Function to send notifications when reports are updated
export const onReportUpdate = functions.firestore.document("reports/{reportId}").onUpdate(async (change, context) => {
  const before = change.before.data()
  const after = change.after.data()
  const reportId = context.params.reportId

  // Only send notification if status changed
  if (before.status === after.status) {
    return null
  }

  try {
    // Notify the report creator
    await db.collection("notifications").add({
      userId: after.userId,
      title: "Report Status Updated",
      message: `Your report "${after.title}" status changed to ${after.status}`,
      type: "info",
      read: false,
      data: { reportId },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending notification:", error)
    return { error: "Failed to send notification" }
  }
})

// Cloud Function to send notifications when tasks are updated
export const onTaskUpdate = functions.firestore.document("tasks/{taskId}").onUpdate(async (change, context) => {
  const before = change.before.data()
  const after = change.after.data()
  const taskId = context.params.taskId

  // Only send notification if status changed
  if (before.status === after.status) {
    return null
  }

  try {
    // Notify the task assignee
    await db.collection("notifications").add({
      userId: after.assigneeId,
      title: "Task Status Updated",
      message: `Task "${after.title}" status changed to ${after.status}`,
      type: "info",
      read: false,
      data: { taskId },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    // If task is completed and linked to a report, update report status
    if (after.status === "completed" && after.reportId) {
      await db.collection("reports").doc(after.reportId).update({
        status: "resolved",
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })
    }

    return { success: true }
  } catch (error) {
    console.error("Error sending notification:", error)
    return { error: "Failed to send notification" }
  }
})

