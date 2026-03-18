import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userId = "4adfae8a-1d7a-446b-9b20-27ca6629cc43";

const movies = [
  {
    title: "The Dark Knight",
    overview:
      "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.",
    releaseYear: 2008,
    genre: ["Action", "Crime", "Drama"],
    runtime: 152,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    createdBy: userId,
  },
  {
    title: "Inception",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseYear: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    runtime: 148,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    createdBy: userId,
  },
  {
    title: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseYear: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    runtime: 169,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    createdBy: userId,
  },
  {
    title: "The Shawshank Redemption",
    overview:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    releaseYear: 1994,
    genre: ["Drama"],
    runtime: 142,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    createdBy: userId,
  },
  {
    title: "Parasite",
    overview:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    releaseYear: 2019,
    genre: ["Comedy", "Drama", "Thriller"],
    runtime: 132,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    createdBy: userId,
  },
  {
    title: "The Godfather",
    overview:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    releaseYear: 1972,
    genre: ["Crime", "Drama"],
    runtime: 175,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLegHnDmsnId.jpg",
    createdBy: userId,
  },
  {
    title: "Pulp Fiction",
    overview:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    releaseYear: 1994,
    genre: ["Crime", "Drama"],
    runtime: 154,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    createdBy: userId,
  },
  {
    title: "Get Out",
    overview:
      "A young African-American visits his white girlfriend's parents for the weekend, where his uneasiness about their family's overly accommodating behavior deepens into a terrifying experience.",
    releaseYear: 2017,
    genre: ["Horror", "Mystery", "Thriller"],
    runtime: 104,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
    createdBy: userId,
  },
  {
    title: "Spirited Away",
    overview:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
    releaseYear: 2001,
    genre: ["Animation", "Adventure", "Family"],
    runtime: 125,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    createdBy: userId,
  },
  {
    title: "Oppenheimer",
    overview:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    releaseYear: 2023,
    genre: ["Biography", "Drama", "History"],
    runtime: 180,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    createdBy: userId,
  },
];

const main = async () => {
  console.log("seeding movies...");
  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
    console.log(`created movie: ${movie.title}`);
  }

  console.log("seeding completed");
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
