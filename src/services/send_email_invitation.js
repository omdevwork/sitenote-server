const nodemailer = require("nodemailer");
const ENCRYPTION_METHODS = require("../utils/encryption_methods");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "hellositenote@gmail.com",
    pass: "ghmv xqsb byji odjc",
  },
});

const send_email_invitation = async (req, res) => {
  const { email, teamId, teamName } = req.body;

  try {
    await transporter.sendMail({
      from: "hellositenote@gmail.com",
      to: email,
      subject: "Invitation to join our team",
      text: `You have been invited to join ${teamName} team! Click the link to register: http://localhost:3000/api/user/accept_invitation/${teamId}`,
    });

    res.send("Invitation email sent successfully!");
  } catch (error) {
    console.error("Error sending invitation email:", error);
    res.status(500).send("Failed to send invitation email.");
  }
};

const accept_invitation = async (req, res) => {
  let teamId = req.params.teamId;
  res.send("Team Id : " + teamId);
};

module.exports = { send_email_invitation, accept_invitation };
