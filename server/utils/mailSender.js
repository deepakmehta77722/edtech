const dotenv = require("dotenv");
dotenv.config();
const { Resend } = require("resend")
const resend = new Resend(process.env.RESEND_API_KEY)


const mailSender = async (email, title, body) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: title,
      html: body,
    })

    if (error) {
      console.log("Resend Error:", error)
      return {
        success: false,
        message: "Email not sent",
        error,
      }
    }

    console.log("Resend Email Data:", data)

    return {
      success: true,
      message: "Email sent successfully",
      data,
    }
  } catch (error) {
    console.log("Mail Sender Error:", error)

    return {
      success: false,
      message: "Email not sent",
      error: error.message,
    }
  }
}

module.exports = mailSender