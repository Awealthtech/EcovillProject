const nodemailer = require("nodemailer");
const Otp = require("../models/otpModel");

// sendOtp verified page
const sendOtpGet = async (req, res) => {
  return res.render("index", {error: ""});
}
// otpVerificationGet
const otpVerificationGet = async (req, res) => {
  return res.render("otpVerification", {error: ""});
}

// Function to send OTP via email
 const sendOTP = async (req, res) => {
    const { email } = req.body;
    const existingUser = await Otp.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'user already exists' });
        }
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  // const newOtp = new Otp({ email, otp: otpCode });
  // await newOtp.save();

let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.AUTH_EMAIL,
		pass: process.env.AUTH_PASSWORD,
	}
});

let mailDetails = {
	from: process.env.AUTH_EMAIL,
	to: email,
	subject: 'Test mail',
	text: `Your OTP for verification is: ${otpCode}`
};

mailTransporter.sendMail(mailDetails, function(err, data) {
	if(err) {
		console.log('Error Occurs');
    return res.render("index");
	} else {
		console.log('Email sent successfully');
    return res.redirect("/verifyOTP", 200 , {error: ""});
	}
});
    }
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  
  //   auth: {
  //     user: "alegbeleyebukola42@gmail.com",
  
  //     pass: "rrsysiasjczvhmjg",
  //   },
  // });
  
  // const sendMail = async ({ to, subject, message }) => {
  //   // const emailPath = "../templates/reset-pwd.ejs"
  
  //   const mailOption = {
  //     from: "alegbeleyebukola42@gmail.com",
  
  //     to,
  
  //     subject, // html:emailPath({data:"link"}),
  //     message,
  //   };
  
  //   transporter.sendMail(mailOption, function (error, info) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log("email was sent", info);
  //     }
    // });
  // };
  
  // setTimeout(() => {
  //   sendMail({
  //     to: email,
  //     subject: `welcome otp is ${otpCode}`,
  //     message: `Your OTP for verification is: ${otpCode}`
  //   });
  // }, 3000);
  
//   console.log("hi");
//   return res.json({message:"sent"});
//   // Save the OTP to the database (you can use any database, here we're using MongoDB with Mongoose)
//    } catch (error) {
//     return res.json({message:"not sent"});
//   }
// }



// let mailTransporter = nodemailer.createTransport({
// 	service: 'gmail',
// 	auth: {
// 		user: process.env.AUTH_EMAIL,
// 		pass: process.env.AUTH_PASSWORD,
// 	}
// });
// const mailOptions = {
// 	from: process.env.AUTH_EMAIL,
// 	to: email,
// 	subject: 'Test mail',
// 	text: `Your OTP for verification is: ${otpCode}`
// }; 
// const newOtp = new Otp({ email, otp: otpCode });
// await newOtp.save();
// await mailTransporter.sendMail(mailOptions);
// // res.json({message:"Email sent successfully"});
// return res.json({message:"sent"});
//   } catch (error) {
//     return res.json({message:"not sent"});
//   }
// }


// Function to verify OTP
async function verifyOTP(req, res) {
  const {otp } = req.body;

  // Check if the OTP exists in the database
  const savedOtp = await Otp.findOne({ otp });

  if (savedOtp) {
    // Delete the OTP from the database as it's a one-time use
    await savedOtp.deleteOne();
    return res.render("userinfo");
  } else {
    return res.render("userinfo");
  }
}

module.exports = { sendOTP, verifyOTP, sendOtpGet, otpVerificationGet };
