// import nodemailer from "nodemailer"
// import dotenv from "dotenv"
// dotenv.config()
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   port: 465,
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user:process.env.EMAIL,
//     pass:process.env.EMAIL_PASS,
//   },
// });

// const sendMail=async (to,otp)=>{
// await transporter.sendMail({
//     from:`${process.env.EMAIL}`,
//     to,
//     subject: "Reset Your Password",
//     html:`<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
// })
// }

// export default sendMail


import dotenv from "dotenv"
dotenv.config()



const sendMail = async (to, otp) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": process.env.BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Vybe", email: process.env.BREVO_SENDER_EMAIL },
      to: [{ email: to }],
      subject: "Reset Your Password",
      htmlContent: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`,
    }),
  })
    console.log('KEY:', process.env.BREVO_API_KEY) 

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Brevo email failed (${response.status}): ${errorBody}`)
  }

  return response.json()
}

export default sendMail