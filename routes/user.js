const { Router } = require("express");
const User = require("../models/user");
const userRouter = Router();

userRouter.get("/signup", (req, res) => {
  res.render("signup");
});

userRouter.get("/signin", (req, res) => {
  res.render("signin");
});

userRouter.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect username or password",
    });
  }
});

userRouter.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

module.exports = userRouter;
