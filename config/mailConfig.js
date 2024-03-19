// config/mailConfig.js

module.exports = {
  emailConfig: {
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  },
};
