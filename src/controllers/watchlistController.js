import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, note, userId } = req.body;

  // verify movie exists
  const movie = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
  });

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  // check if movie is already in watchlist
  const existingItem = await prisma.watchListItem.findUnique({
    where: {
      userId_movieId: {
        userId: userId,
        movieId: movieId,
      },
    },
  });

  if (existingItem) {
    return res.status(400).json({ message: "Movie already in watchlist" });
  }


  const watchlist = await prisma.watchListItem.create({
    data: {
      userId,
      movieId,
      status: status || "PLANNED",
      rating,
      note,
    },
  });

  res.status(201).json({
    status: "success",
    data: watchlist,
  });
};

export {addToWatchlist}