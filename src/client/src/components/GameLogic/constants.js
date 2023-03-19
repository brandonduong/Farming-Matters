export const SEASONS = ["Winter", "Spring", "Summer", "Fall"];
export const avatarNames = [
  ["Jerry", "the Consultant"],
  ["Bob", "the tools smith"],
  ["Alice", "the weather woman"],
];

export const consultantNames = [["Jerry", "the Consultant"]];

export const avatarDescription = [
  "Hello there local farmer, I am a consultant and here to provide you with information regarding anything relating to the farm",
  "Hey there neighbour, I am a local tools smith if you needed any tools I can provide with to you. Just give me a call anytime you need a tool",
  "Howdy farmer, I am a local weather woman. Here to provide any updates about current weather for today!",
];

export const generalDialog = [
  "Today is a beautiful day!",
  "How are your crops going?",
  "I got a big shipment of equipment coming in, hope they are worth the price!",
];

export const gameEvents = {
  Market: {
    statement: `The market value of %item% is going to %increaseOrDecrease% %statistic% in the coming %season%`,
    action: { BuyItem: "%item%" },
    probability: [0.2, 1],
  },
  Season: {
    Winter: {
      SnowStorm: {
        statement:
          "A snow storm is following along, make sure to be prepared as it will %statistic%",
      },
    },
    Spring: {
      HeavyRain: {
        statement:
          "Heavy rain is following along, make sure to be prepared as it will %statistic%",
      },
    },
    Summer: {
      Drought: {
        statement:
          "A severe drought is following along, make sure to be prepared as it will %statistic%",
      },
    },
    Fall: {
      Tornadoes: {
        statement:
          "A big tornado is headed your way, make sure to be prepared as it will %statistic%",
      },
    },
  },
  Miscellaneous: {
    statements: [
      "There is a group of people up to no good, there is a %statistic% of your inventory being",
    ],
  },
};
export const eventProbabilities = [];

export const EVENT_OCCUR_THRESHOLD = 0.6;

export const itemFluctuation = [
  {
    id: 0,
    name: "Rice",
    fluctuationFactor: 2,
  },
  {
    id: 1,
    name: "Carrot",
    fluctuationFactor: 1.5,
  },
  {
    id: 2,
    name: "Orange",
    fluctuationFactor: 2.5,
  },
  {
    id: 3,
    name: "Lettuce",
    fluctuationFactor: 2.1,
  },
  {
    id: 4,
    name: "Tomato",
    fluctuationFactor: 2.1,
  },
  {
    id: 5,
    name: "Watermelon",
    fluctuationFactor: 3.0,
  },
  {
    id: 6,
    name: "Wheat",
    fluctuationFactor: 2.1,
  },
  {
    id: 7,
    name: "Pumpkin",
    fluctuationFactor: 1.9,
  },
  {
    id: 8,
    name: "Beet",
    fluctuationFactor: 2.1,
  },
  {
    id: 9,
    name: "Berries",
    fluctuationFactor: 2.1,
  },
  {
    id: 10,
    name: "Mushroom",
    fluctuationFactor: 3.0,
  },
  {
    id: 11,
    name: "Wintermelon",
    fluctuationFactor: 2.1,
  },
  {
    id: 12,
    name: "Fertilizer",
    fluctuationFactor: 3.0,
  },
  {
    id: 13,
    name: "Pesticide",
    fluctuationFactor: 2.1,
  },
];


export const seasonTransition = [
  {
    "SnowStorm": 
    "Oh dear it looks a severe Snow Storm has came in overnight. Crops that are not protected will be destroyed."
  },
  
  {
    "HeavyRain": "Oh dear it looks a severe Thunder Storm has came in overnight. Crops that are not protected will be destroyed."
  },
  {
    "Drought": "Oh dear it looks a severe Drought has came in overnight. Crops that are not protected will be destroyed."
  },
  {
    "Tornadoes": "Oh dear it looks a severe Tornado has came in overnight. Crops that are not protected will be destroyed."
  }
];