// websocketHandler.js
const WebSocket = require("ws");
const MaterialOrder = require("../models/materialOrderModel");
const Task = require("../models/tasksModel");

const userIds = new Map();

// Define WebSocket connection event
function createTasksWebsocket(wss) {
  wss.on("connection", (ws, req) => {
    const userId = req.url.substr(1); // Extract teamId from request URL

    // If teamId is provided, add client to corresponding team
    if (userId) {
      // Add client to teamClients map
      if (!userIds.has(userId)) {
        userIds.set(userId, new Set());
        userIds.get(userId).add(ws);
      }

      // Handle WebSocket messages
      ws.on("message", (message) => {
        console.log("Message" + message);

        Task.find({ assignedToId: message })
          .then((tasks) => {
            tasks.forEach((task) => {
              ws.send(JSON.stringify(task));
            });
          })
          .catch((error) => {
            console.error("Error fetching materials:", error);
          });
      });

      // Handle WebSocket closing
      ws.on("close", () => {
        userIds.get(message).delete(ws);
      });
    }
  });
}

module.exports = { createTasksWebsocket, userIds };
