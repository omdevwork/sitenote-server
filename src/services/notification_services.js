const FCM = require('fcm-node');
const dotenv = require('dotenv');
dotenv.config();

// Initialize FCM with your server key
let fcm = new FCM(process.env.FCM_SERVER_KEY);

module.exports.sendNotification = (registrationToken, title, body, path) => {
  // Define the registration token obtained from the client
const token = registrationToken

// Define the notification message
const message = {
  to: token,
  notification: {
    title: title,
    body: body,
    icon: "/logo.png",
    click_action: `https://site-note-client.vercel.app/${path}`,
  },
};

// Send notification
fcm.send(message, function(err, response) {
  if (err) {
    console.error('Error sending notification:', err);
  } else {
    console.log('Notification sent successfully:', response);
  }
});
}