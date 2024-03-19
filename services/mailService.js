const nodemailer = require("nodemailer");
const { emailConfig } = require("../config/mailConfig");

const mailingService = {
  sendContactEmail: async (name, email, message) => {
    try {
      const transporter = nodemailer.createTransport(emailConfig);
      const mailOptions = {
        from: emailConfig.auth.user,
        to: emailConfig.auth.user,
        subject: "Contact Form Submission",
        html: `
          <p>Hello,</p>
          <p>You have received a new contact form submission:</p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
          </ul>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p>Thank you.</p>
        `,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error("Failed to send email");
    }
  },
};

module.exports = mailingService;
