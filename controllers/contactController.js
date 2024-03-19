// controllers/contactController.js

const mailingService = require("../services/mailService");

const contactController = {
  sendEmail: async (req, res) => {
    try {
      const { name, email, message } = req.body;
      await mailingService.sendContactEmail(name, email, message);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Failed to send email");
    }
  },
};

module.exports = contactController;
