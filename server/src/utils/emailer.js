import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,           // smtp.gmail.com
  port: Number(process.env.SMTP_PORT),   // 587
  secure: false,                         // must be false for port 587
  auth: {
    user: process.env.SMTP_USER,         // your Gmail
    pass: process.env.SMTP_PASS,         // your Gmail App Password
  },
});

// EMAIL SENDER
export const sendMail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `"TasteNtalk" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text,
    });

    console.log("Email sent successfully:", info.messageId);
    return info;

  } catch (error) {
    console.error("EMAIL SENDING ERROR:", error.message);
    console.error("FULL SMTP ERROR:", error);

    throw new Error("Email sending failed");
  }
};
