export const avatarNames = [
    ["Jerry", "the Consultant"],
    ["Bob", "the tools smith"],
    ["Alice", "the weather woman"]
];

export const consultantNames = [
    ["Jerry", "the Consultant"],
]

export const avatarDescription = [
    "Hello there local farmer, I am a consultant and here to provide you with information regarding anything relating to the farm",
    "Hey there neighbour, I am a local tools smith if you needed any tools I can provide with to you. Just give me a call anytime you need a tool", 
    "Howdy farmer, I am a local weather woman. Here to provide any updates about current weather for today!"
];

export const generalDialog = [
    "Today is a beautiful day!",
    "How are your crops going?", 
    "I got a big shipment of equipment coming in, hope they are worth the price!",
];

export const gameEvents = {
    
    "Market": {
        "statements" : 
            [`The market value of said crop is to %increaseOrDecrease% by  %statistic%`],
        "action": {"BuyItem": "%item%"},
        "probability": [0.2,1]
    },
    "Season": {
        "statements":
        ['A snow storm is following along, make sure to be prepared as it will be %statistic%',
        'Heavy rain is following along, make sure to be prepared as it will be %statistic%'],
        "probability": [0,0.2],
        "action": {"BuyInsurance": "%item%"}
    },
    "Miscellaneous":{
        "statements": ["There is a group of people up to no good, there is a %statistic% of your inventory being"]
    }
    
};
export const eventProbabilities = [];

 