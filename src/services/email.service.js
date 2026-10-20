const nodemailer = require("nodemailer");
const config = require("../config/config");
const logger = require("../config/logger");

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== "test") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch((err) =>
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}


const sendEmail = async (to, subject, html) => {
  const msg = { from: config.email.from, to, subject, html };
  await transport.sendMail(msg);
};

const sendEmailVerification = async (to, otp) => {
  console.log("sendEmailVerification", to, otp);
  const subject = "User verification code";
  const html = `
 <body style=  @import url('https://googleapis.com'); "background: #f3f4f6; padding: 20px; font-family: 'Poppins', sans-serif; margin: 0;">
  <div style="max-width: 450px; margin: 0 auto; background: #fafafa52; padding: 25px; border-radius: 10px; text-align: center; box-shadow: 0 20px 50px rgba(61, 49, 116, 0.703);">
    
    <!-- logo style -->
    <img src="https://cdn.dribbble.com/users/8413880/avatars/normal/719d702354f182bc45ffb0583007461c.png?1736080075" alt="exmaple" style="max-width: 100px; margin-bottom: 15px;">

    <!-- Heading -->
    <h1 style="color: #000000; margin: 0 0 10px 0;">Your Signup verification Code</h1>
    <p style="color: #4b5563; font-size: 15px; margin-bottom: 20px;">Thank you for joining us! Your account is almost ready.</p>

    <!-- OTP style -->
    <div style="background: linear-gradient(#090979, #020024, #00D4FF); width: 200px; margin-left: 110px; color: #fff; padding: 12px; border-radius: 10px; font-size: 26px; font-weight: bold; letter-spacing: 3px; margin-bottom: 20px;">
      ${otp}
    </div>

    <!-- Details -->
    <p style="color: #6b7280; font-size: 13px; margin-bottom: 5px;">Collect this code to verify your account.</p>
    <p style="color: #dc2626; font-size: 12px; margin-top: 0;">This code expires in 3:00 minutes.</p>

    <!-- Footer Link -->
    <a href="https://yasin96687-cloud.github.io/my-protfolio/" style="color: #303947; font-size: 11px; text-decoration: none;" target="_blank">Developed by Yasin Arafat</a>

  </div>
`;
  await sendEmail(to, subject, html);
};

const sendResetPasswordEmail = async (to, otp) => {
  console.log("Password Reset Email", to, otp);
  const subject = "Password Reset Email";
  const html = `
      <body style=  @import url('https://googleapis.com'); "background: #f3f4f6; padding: 20px; font-family: 'Poppins', sans-serif; margin: 0;">
  <div style="max-width: 450px; margin: 0 auto; background: #fafafa52; padding: 25px; border-radius: 10px; text-align: center; box-shadow: 0 20px 50px rgba(61, 49, 116, 0.703);">
    
    <!-- logo style -->
    <img src="https://cdn.dribbble.com/users/8413880/avatars/normal/719d702354f182bc45ffb0583007461c.png?1736080075" alt="exmaple" style="max-width: 100px; margin-bottom: 15px;">

    <!-- Heading -->
    <h1 style="color: #000000; margin: 0 0 10px 0;">Password Reset Request</h1>
    <p style="color: #4b5563; font-size: 15px; margin-bottom: 20px;">You requested a password reset for your account. Use the code below to reset your password:</p>

    <!-- OTP style -->
    <div style="background: linear-gradient(#090979, #020024, #00D4FF); width: 200px; margin-left: 110px; color: #fff; padding: 12px; border-radius: 10px; font-size: 26px; font-weight: bold; letter-spacing: 3px; margin-bottom: 20px;">
      ${otp}
    </div>

    <!-- Details -->
    <p style="color: #dc2626; font-size: 13px; margin-bottom: 5px;">Collect this code to reset your password. This code is valid for 3 minutes.</p>
    <p style="color: #6b7280; font-size: 12px; margin-top: 0;">If you did not request a password reset, please ignore this email.</p>

    <!-- Footer Link -->
    <a href="https://yasin96687-cloud.github.io/my-protfolio/" style="color: #303947; font-size: 11px; text-decoration: none;" target="_blank">ᯤ Develop by ᯤ</a>

  </div>
   </body>
`;
  await sendEmail(to, subject, html);
};


const sendVerificationEmail = async (to, token) => {
  const subject = "Email Verification";
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendEmailVerification,
};
