import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, note } = req.body;

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
        userId: req.user.id,
        movieId: movieId,
      },
    },
  });

  if (existingItem) {
    return res.status(400).json({ message: "Movie already in watchlist" });
  }

  const watchlist = await prisma.watchListItem.create({
    data: {
      userId: req.user.id,
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

const updateWatchlist = async (req, res) => {
  // verify movie exists
  const { id } = req.params;
  const { status, rating, note } = req.body;

  // verify movie is in watchlist
  const existingItem = await prisma.watchListItem.findUnique({
    where: {
      id,
    },
  });

  if (!existingItem) {
    return res.status(404).json({ message: "Movie not found in watchlist" });
  }

  // ensure only owner can update
  if (existingItem.userId !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // update watchlist
  const watchlist = await prisma.watchListItem.update({
    where: {
      id,
    },
    data: {
      status,
      rating,
      note,
    },
  });
  res.status(200).json({
    status: "success",
    data: watchlist,
  });
};
const deleteWatchlist = async (req, res) => {
  // get the watchlist id from the url
  const { id } = req.params;

  // verify the watchlist exists
  const existingItem = await prisma.watchListItem.findUnique({
    where: {
      id,
    },
  });

  if (!existingItem) {
    return res.status(404).json({ message: "Movie not found in watchlist" });
  }

  // verify the user owns the watchlist
  if (existingItem.userId !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // delete the watchlist
  await prisma.watchListItem.delete({
    where: {
      id,
    },
  });

  // send response
  res.status(200).json({
    status: "success",
    message: "Movie removed from watchlist",
  });
};
const getWatchlist = async (req, res) => {
  // get all watchlist data

  const { status, rating } = req.query;

  // get logged in user watchlist
  const watchlist = await prisma.watchListItem.findMany({
    where: {
      userId: req.user.id,
      ...(status && { status }),
      ...(rating && { rating }),
    },
    include: {
      movie: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: watchlist,
  });
};

export { addToWatchlist, updateWatchlist, deleteWatchlist, getWatchlist };
