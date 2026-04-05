const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD
  }
});

const sendMail = async (to, subject, link) => {
  const html = `
  <div style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8; padding:20px;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1);">

            <!-- Header -->
            <tr>
              <td style="background:#4CAF50; color:white; text-align:center; padding:20px;">
                <h1 style="margin:0;">🔐 Reset Password</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px; text-align:center;">
                <h2 style="margin-bottom:10px;">Hello 👋</h2>
                <p style="color:#555; font-size:16px;">
                  You requested to reset your password. Click the button below to proceed.
                </p>

                <!-- Button -->
                <a href="${link}" 
                   style="display:inline-block; margin-top:20px; padding:12px 25px; background:#4CAF50; color:white; text-decoration:none; border-radius:5px; font-size:16px;">
                   Reset Password
                </a>

                <p style="margin-top:20px; font-size:14px; color:#999;">
                  This link will expire in 10 minutes.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f1f1f1; text-align:center; padding:15px; font-size:12px; color:#777;">
                © 2026 Auth System | All Rights Reserved
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Auth System" <${process.env.USER}>`,
      to,
      subject,
      html
    });

    console.log("✅ Mail sent");
  } catch (err) {
    console.log("❌ Mail error:", err);
  }
};

module.exports = sendMail;