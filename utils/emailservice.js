const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOTPEmail = async (email, otp) => {
  try {

    const mailOptions = {
      from: `"TripVilla Auth" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verification OTP",
      html: `
        <h2>TripVilla Email Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 10 minutes</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);

  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendOTPEmail;
