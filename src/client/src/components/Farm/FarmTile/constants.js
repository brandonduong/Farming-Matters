export const plants = [
  {
    id: 0,
    name: "Nothing",
    growthLength: 0, // Max growth length is one whole season (3 turns)
  },
  // Spring
  {
    id: 1,
    name: "rice",
    growthLength: 1,
    plantableSeasons: [2],
  },
  {
    id: 2,
    name: "carrot",
    growthLength: 2,
    plantableSeasons: [2],
  },
  {
    id: 3,
    name: "orange",
    growthLength: 3,
    plantableSeasons: [2],
  },
  // Summer
  {
    id: 4,
    name: "lettuce",
    growthLength: 1,
    plantableSeasons: [3],
  },
  {
    id: 5,
    name: "tomato",
    growthLength: 2,
    plantableSeasons: [3],
  },
  {
    id: 6,
    name: "watermelon",
    growthLength: 3,
    plantableSeasons: [3],
  },
  // Fall
  {
    id: 7,
    name: "wheat",
    growthLength: 1,
    plantableSeasons: [0],
  },
  {
    id: 8,
    name: "pumpkin",
    growthLength: 2,
    plantableSeasons: [0],
  },
  {
    id: 9,
    name: "beet",
    growthLength: 3,
    plantableSeasons: [0],
  },
  // Winter
  {
    id: 10,
    name: "berries",
    growthLength: 1,
    plantableSeasons: [1],
  },
  {
    id: 11,
    name: "mushroom",
    growthLength: 2,
    plantableSeasons: [1],
  },
  {
    id: 12,
    name: "wintermelon",
    growthLength: 3,
    plantableSeasons: [1],
  },
];
