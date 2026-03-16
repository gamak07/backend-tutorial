import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateTokens } from "../utils/generateTokens.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await prisma.user.findUnique({ where: { email } });

  if (userExist) {
    return res
      .status(400)
      .json({ message: "User already exists with this email" });
  }

  //   hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = generateTokens(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      id: user.id,
      name: name,
      email: email,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateTokens(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      id: user.id,
      email: email,
    },
    token,
  });
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ status: "success", message: "Logout successful" });
};

export { register, login, logout };
