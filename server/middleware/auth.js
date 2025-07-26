import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("🔐 Auth middleware triggered");

  try {

    jwt.verify(token, process.env.JWT_SECRET);
    next(); // Token is valid
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default auth;
