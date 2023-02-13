export const plants = [
  {
    id: 0,
    name: "Nothing",
    growthLength: 0, // Max growth length is one whole season (3 turns)
  },
  // Spring
  {
    id: 1,
    name: "Rice",
    growthLength: 1,
    plantableSeasons: [2],
  },
  {
    id: 2,
    name: "Carrot",
    growthLength: 2,
    plantableSeasons: [2],
  },
  {
    id: 3,
    name: "Orange",
    growthLength: 3,
    plantableSeasons: [2],
  },
  // Summer
  {
    id: 4,
    name: "Lettuce",
    growthLength: 1,
    plantableSeasons: [3],
  },
  {
    id: 5,
    name: "Tomato",
    growthLength: 2,
    plantableSeasons: [3],
  },
  {
    id: 6,
    name: "Watermelon",
    growthLength: 3,
    plantableSeasons: [3],
  },
  // Fall
  {
    id: 7,
    name: "Wheat",
    growthLength: 1,
    plantableSeasons: [0],
  },
  {
    id: 8,
    name: "Pumpkin",
    growthLength: 2,
    plantableSeasons: [0],
  },
  {
    id: 9,
    name: "Beet",
    growthLength: 3,
    plantableSeasons: [0],
  },
  // Winter
  {
    id: 10,
    name: "Berries",
    growthLength: 1,
    plantableSeasons: [1],
  },
  {
    id: 11,
    name: "Mushroom",
    growthLength: 2,
    plantableSeasons: [1],
  },
  {
    id: 12,
    name: "Wintermelon",
    growthLength: 3,
    plantableSeasons: [1],
  },
];
