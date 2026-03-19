import express from "express";
import { addToWatchlist, updateWatchlist, deleteWatchlist, getWatchlist } from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware)

router.post("/", addToWatchlist);
router.put("/:id", updateWatchlist);
router.delete("/:id", deleteWatchlist);
router.get("/", getWatchlist);

export default router;