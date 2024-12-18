const express = require("express");
const userRoutes = require("./src/routes/users_route.js");
const taskRoutes = require("./src/routes/tasks_routes.js");
const db = require("./src/utils/db.js");
const projectRoutes = require("./src/routes/project_routes.js");
const materialOrderRoutes = require("./src/routes/material_order_routes.js");
const flatRoutes = require("./src/routes/flat_routes.js");
const teamRoutes = require("./src/routes/team_routes.js");
const inquiryRoutes = require("./src/routes/inquiry_routes.js");
const announcementRoutes = require("./src/routes/announcement_route.js");
const paymentRoutes = require("./src/routes/payment_route.js");
const activityRoutes = require("./src/routes/activity_route.js");
const rentRoutes = require("./src/routes/rent_route.js");
// const wss = require("./src/utils/webserver.js");
const cors = require("cors");
// const AuthorizationMiddleware = require("./src/middleware/authorization_middleware.js");

// const {
//   handleWebSocketServer,
// } = require("./src/websockets/material_websocket.js");

// const { createTasksWebsocket } = require("./src/websockets/tasks_websocket.js");
const app = express();
app.use(express.json());

const apiRouter = express.Router();

apiRouter.use("/user", userRoutes);
apiRouter.use("/task", taskRoutes);
apiRouter.use("/project", projectRoutes);
apiRouter.use("/materialOrder", materialOrderRoutes);
apiRouter.use("/flat", flatRoutes);
apiRouter.use("/team", teamRoutes);
apiRouter.use("/inquiry", inquiryRoutes);
apiRouter.use("/announcement", announcementRoutes);
apiRouter.use("/payment", paymentRoutes);
apiRouter.use("/activity", activityRoutes);
apiRouter.use("/rent", rentRoutes);
app.use(
  cors({
    origin: ["https://site-note-client.vercel.app", "https://app.sitenote.in"], // Allow requests from these origins
  })
);
app.use("/api", apiRouter);

const PORT = process.env.PORT;

// handleWebSocketServer(wss);
// createTasksWebsocket(wss);

app.get("/", (req, res) => {
  res.send("Welcome to sitenote server");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
