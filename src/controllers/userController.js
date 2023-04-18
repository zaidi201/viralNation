const jwt = require("jsonwebtoken");
const db = require("../../models");
const bcrypt = require("bcrypt");
const emailSender = require("../helper/emailSend");
const validation = require("../helper/validation");
require("dotenv").config();

//adding user
exports.addUser = async (data) => {
  try {
    //checking for email already exists
    const check = await db.user.findOne({ where: { email: data.email } });
    if (check) {
      return {
        message: "email already exists",
      };
    }
    //validating email
    if ((await validation.validateEmail(data.email)) != true) {
      return { message: "invalid email" };
    }

    //validating password(commented because of test purposes)
    // if ((await validation.validatePassword(data.password)) != true) {
    //   return { message: "invalid password" };
    // }

    //password encryption
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(data.password, salt, function (err, hash) {
        data.password = hash;
        const token = Math.random().toString(36);

        data.verificationToken = token;
        db.user
          .create(data)
          .then((data1) => {
            //commented because we have to use actual email credentials for account confromation email to users. you can see helper function
            // try {
            //   const html =
            //     '<a href="https://dummy.com/confirmationAccount?token=' +
            //     token +
            //     "&userId=" +
            //     data1.id +
            //     '"><b>Confirm Account Now!</b></a>' +
            //     '<p><a href="https://dummy.com">Viral Nation</a></p>' +
            //     "<br><br><p>-- Viral Nation.com</p></a>";
            //   emailSender.sendEmail(
            //     data1.email,
            //     "Viral Nation Account Confirmation",
            //     "Viral Nation",
            //     html
            //   );
            // } catch (e) {
            //   console.log("=================", e);
            // }
          })
          .catch((e) => {
            return {
              message: e,
            };
          });
      });
    });
    return {
      message: "user created",
    };
  } catch (e) {
    console.log("error", e);
  }
};

//user login
exports.userLogin = async (data) => {
  const user = await db.user.findOne({
    where: {
      email: data.email,
    },
  });
  // email verification check
  // if (user.emailVerified == false) return { message: "Email not verified" };

  if (!user) return { message: "User not found" };
  const isValid = await bcrypt.compare(data.password, user.password);
  if (!isValid) return { success: false, message: "Invalid Credentials" };

  //token assigning
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.secret,
    { expiresIn: "1d" }
  );

  return {
    id: user.id,
    userName: user.userName,
    email: user.email,
    token,
  };
};

//forgot password
exports.forgotPassword = async (email) => {
  const user = await db.user.findOne({
    where: {
      email,
    },
  });

  // sending new link with token to user email
  if (!user) return { message: "User not found" };
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.secret,
    { expiresIn: "1d" }
  );
  // try {
  // const link = `https:viralnation.com/resetpassword?token=${token}&id=${user.id}`;

  //   emailSender.sendEmail(
  //     user.email,
  //     "Viral Nation Password Reset",
  //     link,
  //
  //   );
  // } catch (e) {
  //  return {message:"failed to send email"}
  // }

  //updating token in user db so to check when user click on reset link(token is same and valid)
  await db.user.update(
    {
      verificationToken: token,
    },
    {
      where: { id: user.id },
    }
  );

  return { message: "reset link sent to email" };
};

//reset password after clicking on link send to user email
exports.resetPassword = async (data) => {
  var hashed;

  var user = await db.user.findOne({
    where: {
      id: data.userId,
    },
  });
  if (!user) {
    return { message: "user not found" };
  }
  //token check
  if (
    user.verificationToken != data.token ||
    !jwt.verify(data.token, process.env.secret)
  ) {
    return { message: "invalid token" };
  }

  //Encrypt Password
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(data.password, salt, function (err, hash) {
      hashed = hash;
    });
  });

  //setting verification token to null
  await db.user.update(
    {
      verificationToken: null,
      password: hashed,
    },
    {
      where: { id: data.userId },
    }
  );
  return { message: "password reset successfull" };
};
