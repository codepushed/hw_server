const nodemailer = require("nodemailer");

const mailHelper = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.ethereal.email",
    port: 587,
    secure: true,
    auth: {
      user: "mehrashubham7999@gmail.com",
      pass: "njtx zvfc sqxq oozz",
    },
  });

  const message = {
    from: "mehrashubham7999@gmail.com",
    to: "mehrashubham216@gmail.com",
    subject: "hey",
    text: "from node mailer",
    // html: "<a>"
  };
  await transporter.sendMail(message);
};
