// importin models and more files

const UserModel = require("../models/UserModel");
const { generateJwtToken } = require("../config/Jwt_auth");
const bcryptJs = require("bcryptjs");

// User Account Creation function
const AccountCreate = async (req, res) => {
  // Extract input Data from request body
  const { fullName, emailId, password } = req.body;
  // Regular expression for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!fullName) {
    return res.json({
      status: false,
      message: "Enter Valid Name.",
    });
  }
  if (!emailId && !emailRegex.test(emailId)) {
    return res.json({
      status: false,
      message: "Enter Valid Email Please.",
    });
  }
  if (!passwordRegex.test(password)) {
    return res.json({
      status: false,
      message: "Enter Valid Password with special charector and min 6 digit",
    });
  }
  //   securing password
  const hashedPassword = await bcryptJs.hash(password, 10);
  //   email valid
  const validEmail = emailId.toLowerCase();

  try {
    const user = await UserModel.findOne({ emailId: validEmail });
    if (user) {
      return res.json({
        status: false,
        message: "User Already exists with this email",
      });
    }
    const newUser = await new UserModel({
      emailId: validEmail,
      password: hashedPassword,
      fullName: fullName,
    });
    // saving details in db
    await newUser.save();
    return res.json({
      status: true,
      message: "Account Created Successfully",
    });
  } catch (error) {
    return res.json({ status: false, message: "Internal Server Error" });
  }
};

// Login User function and send token

const LoginUser = async (req, res) => {
  // Extract email and password from request body
  const { emailId, password } = req.body;
  // Convert email to lowercase for case-insensitive comparison
  const validEmail = emailId.toLowerCase();

  try {
    // Check if the user exists
    const userExists = await UserModel.findOne({ emailId: validEmail });
    if (!userExists) {
      return res.json({
        status: false,
        message:
          "User Email Not Found or User Does Not Exist,Please Create New Account",
      });
    }
    // Verify the password
    const passwordMatch = await bcryptJs.compare(password, userExists.password);
    if (!passwordMatch) {
      return res.json({
        status: false,
        message: "Incorrect Password Try Again !",
      });
    }
    // generate a token for authentication with expires Time
    const token = await generateJwtToken(
      userExists._id,
      userExists.fullName,
      userExists.emailId
    );

    // send success messagae with token
    return res.json({
      status: true,
      message: "Logged in successfull",
      token: token,
    });
  } catch (error) {
    next(error);
    return res.json({ status: false, message: "Internal Server Error" });
  }
};

// exporting for global uses
module.exports = {
  AccountCreate,
  LoginUser,
};
