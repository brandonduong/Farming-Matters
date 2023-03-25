export const SEASONS = ["Winter", "Spring", "Summer", "Fall"];
export const avatarNames = [
  ["Jerry", "Consultant"],
  ["Bob", "Tools Smith"],
  ["Alice", "Local Guide"],
];

export const consultantNames = [["Jerry", "the Consultant"]];

export const avatarDescription = [
  "Hello there local farmer, I am a consultant and here to provide you with information regarding anything relating to the farm",
  "Hey there neighbour, I am a local tools smith if you needed any tools I can provide with to you. Just give me a call anytime you need a tool",
  "Howdy farmer, welcome to the town. I am a local farmer myself as well as the towns Local Guide",
];

export const generalDialog = [
  "Today is a beautiful day!",
  "How are your crops going?",
  "I got a big shipment of equipment coming in, hope they are worth the price!",
  "I heard that you can sell items in the shop to make money",
  "Did you know that this location is known for having disastrous events? I wish I knew that before moving here",
  "The nearby shop has recently added an insurance option when purchasing a seed in order to protected from a severe market decrease of an item in a given season",
  "I did not realize how terrible the Snow Storm really was until all my growing crops were destroyed",
  "I did not realize how terrible the Drought really was until all my growing crops were destroyed",
  "I did not realize how terrible the Tornado really was until all my growing crops were destroyed",
  "I did not realize how terrible the Thunderstorm really was until all my growing crops were destroyed",
  "There is this amazing feature on farm's nowadays that tell you when a planted seed is ready to be harvested.",
  "I did not recently learn about this till recently but you can see the actually how long it takes to grow a particular crop on the farm",
  "If you looked at your personal inventory, you can see all the crops you have harvested and the amounts of each. Also able to display your insurance contracts of a given crop",
];

export const gameEvents = {
  Market: {
    statement: `The market value of %item% is going to %increaseOrDecrease% in the coming %season%  %statistic%`,
    action: { BuyItem: "%item%" },
    probability: [0.2, 1],
  },
  Season: {
    Winter: {
      SnowStorm: {
        statement:
          "Brrrrrr! I heard a Snow Storm may or may not follow along. In the worst case make sure to be prepared as I think it will %statistic%",
      },
    },
    Spring: {
      HeavyRain: {
        statement:
          "Heavy rain may or may not follow along. In the worst case make sure to be prepared as I think it will %statistic%",
      },
    },
    Summer: {
      Drought: {
        statement:
          "A severe drought may or may not follow along. In the worst case make sure to be prepared as I think it will %statistic%",
      },
    },
    Fall: {
      Tornadoes: {
        statement:
          "A big tornado may or may not follow along. In the worst case make sure to be prepared as I think it will %statistic%",
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

export const EVENT_OCCUR_THRESHOLD = 0.85;

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

export const fallIcon =  require("../../assets/SeasonIcons/fall_icon.png");
export const winterIcon =  require("../../assets/SeasonIcons/winter_icon.png");
export const springIcon =  require("../../assets/SeasonIcons/spring_icon.png");
export const summerIcon =  require("../../assets/SeasonIcons/summer_icon.png");
export const toolIcon = require("../../assets/SeasonIcons/tools.png")

export const seasonIconMapping = {
  "Fall": fallIcon,
  "Winter": winterIcon,
  "Spring": springIcon,
  "Summer": summerIcon,
  "" : toolIcon,
}

export const underwaterImg = require("../../assets/SeasonTransitions/Underwater_event.png");
export const heavyRainImg = require("../../assets/SeasonTransitions/Rain_storm-3.png");
export const winterImg = require("../../assets/SeasonTransitions/Winter_event2.png");
export const torandoImg = require("../../assets/SeasonTransitions/Tornado-4.png");