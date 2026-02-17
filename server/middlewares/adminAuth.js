import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {

  const token = req.headers.token;

  if (!token) {

    return res.status(401).json("No token provided");

  }

  // Allow static admin token
  if (token === "admin-token") {

    req.user = {
      id: "admin123",
      role: "admin"
    };

    return next();

  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    req.user = decoded;

    next();

  }

  catch (error) {

    console.log(error);

    return res.status(401).json("Invalid token");

  }

};

export default adminAuth;
