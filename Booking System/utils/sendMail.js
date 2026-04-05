const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD
  }
});

const sendBookingEmail = async (to, userName, dishName, date, time, status) => {
  const html = `
  <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; border-radius:10px;">
      
      <div style="background:#ff6b6b; color:white; padding:20px; text-align:center;">
        <h1>🍽️ Dish Booking System</h1>
      </div>

      <div style="padding:20px;">
        <h2>Hello ${userName},</h2>

        <table style="width:100%; border-collapse:collapse;">
          <tr>
            <td style="padding:10px; border:1px solid #ddd;">Dish</td>
            <td style="padding:10px; border:1px solid #ddd;">${dishName}</td>
          </tr>
          <tr>
            <td style="padding:10px; border:1px solid #ddd;">Date</td>
            <td style="padding:10px; border:1px solid #ddd;">${date}</td>
          </tr>
          <tr>
            <td style="padding:10px; border:1px solid #ddd;">Time</td>
            <td style="padding:10px; border:1px solid #ddd;">${time}</td>
          </tr>
          <tr>
            <td style="padding:10px; border:1px solid #ddd;">Status</td>
            <td style="padding:10px; border:1px solid #ddd; color:green;">${status}</td>
          </tr>
        </table>
      </div>

      <div style="background:#333; color:white; text-align:center; padding:10px;">
        <p>© 2026 Dish Booking System</p>
      </div>

    </div>
  </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Dish Booking System" <${process.env.USER}>`,
      to,
      subject: "🍽️ Booking Confirmation",
      html
    });

    console.log("✅ Email sent");
  } catch (error) {
    console.log("❌ Email error:", error);
  }
};

module.exports = sendBookingEmail;