import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ httpMethod: req.method, message: "Hello World" });
});
router.post("/", (req, res) => {
  res.json({ httpMethod: req.method, message: "Hello World" });
});
router.put("/", (req, res) => {
  res.json({ httpMethod: req.method, message: "Hello World" });
});
router.delete("/", (req, res) => {
  res.json({ httpMethod: req.method, message: "Hello World" });
});

export default router;