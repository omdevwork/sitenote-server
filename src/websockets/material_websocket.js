// websocketHandler.js
const WebSocket = require("ws");
const MaterialOrder = require("../models/materialOrderModel");

const projectUsers = new Map();

// Define WebSocket connection event
function handleWebSocketServer(wss) {
  wss.on("connection", (ws, req) => {
    const projectId = req.url.substr(1); // Extract teamId from request URL

    // If teamId is provided, add client to corresponding team
    if (projectId) {
      // Add client to teamClients map
      if (!projectUsers.has(projectId)) {
        projectUsers.set(projectId, new Set());
      }
      projectUsers.get(projectId).add(ws);

      // Handle WebSocket messages
      ws.on("message", (message) => {
        // Broadcast message to all clients in the same team
        // projectUsers.get(projectId).forEach((client) => {
        //   if (client !== ws && client.readyState === WebSocket.OPEN) {

        // });
        MaterialOrder.find({ projectId: message })
          .then((materials) => {
            materials.forEach((material) => {
              ws.send(JSON.stringify(material));
            });
          })
          .catch((error) => {
            console.error("Error fetching materials:", error);
          });
      });

      // Handle WebSocket closing
      ws.on("close", () => {
        projectUsers.get(message).delete(ws);
      });
    }
  });
}

// // Store user materials
// const userMaterials = {};
// function handleWebSocketServer(wss) {
//   //const myVariable = app.get('myVariable');

//   wss.on("connection", function connection(ws) {
//     console.log("hello");

//     ws.on("open", function () {
//       clients.set(ws, { name: "Adam" }); // Change 'Adam' to the actual client's name
//     });

//     ws.on("message", function incoming(message) {
//       userId = message;
//       console.log("hello" + userId);

//       // Create a connection for the user
//       userMaterials[userId] = ws;

//       // Send existing materials to the user
//       MaterialOrder.find({ projectId: userId })
//         .then((materials) => {
//           materials.forEach((material) => {
//             ws.send(JSON.stringify(material));
//           });
//         })
//         .catch((error) => {
//           console.error("Error fetching materials:", error);
//         });

//       ws.on("message", function incoming(data) {
//         // Receive new material creation event
//         const newMaterial = JSON.parse(data);

//         // Save the material to MongoDB
//         Material.create({
//           userId: userId,
//           content: newMaterial.content,
//         })
//           .then((material) => {
//             // Broadcast the new material to all clients (including the sender)
//             wss.clients.forEach((client) => {
//               if (client.readyState === WebSocket.OPEN) {
//                 client.send(JSON.stringify(material));
//               }
//             });
//           })
//           .catch((error) => {
//             console.error("Error saving material:", error);
//           });
//       });

//       ws.on("close", function () {
//         // Remove user's connection when they disconnect
//         delete userMaterials[userId];
//       });
//     });
//   });
// }

module.exports = { handleWebSocketServer, projectUsers };
