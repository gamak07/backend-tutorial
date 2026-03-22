import express from "express";
import { addToWatchlist, updateWatchlist, deleteWatchlist, getWatchlist } from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema } from "../vaildators/watchlistValidators.js";

const router = express.Router();
router.use(authMiddleware)

router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);
router.put("/:id", validateRequest(addToWatchlistSchema), updateWatchlist);
router.delete("/:id", deleteWatchlist);
router.get("/", getWatchlist);

export default router;