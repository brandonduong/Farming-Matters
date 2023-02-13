const createUserTable = (database, userId) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS LoggedActions_" +
    userId +
    " (action_id INT AUTO_INCREMENT NOT NULL, action MEDIUMTEXT NOT NULL, time DATETIME NOT NULL DEFAULT (NOW()), PRIMARY KEY (action_id))";

  database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

const deleteUserTable = (databse, userId) => {
  let sql = "DROP TABLE LoggedActions_" + userId;

  databse.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

const logData = (database, userId, action) => {
  let sql = "INSERT INTO LoggedActions_" + userId + " (action) values (?)";

  database.query(sql, action, (err, result) => {
    if (err) throw err;
    // console.log(result);
  });
};

// Update the code to use ? instead of putting in values directly in the string
const saveGame = (database, userId, gameData) => {
  let containsQuery = `SELECT * FROM GAMESTATE where user_id='${userId}'`;

  database.query(containsQuery, (err, result) => {
    if (err) throw err;
    let sql = "";

    if (result.length > 0) {
      sql = `update GAMESTATE set turn = ${gameData["turn"]}, season = '${
        gameData["season"]
      }', money = ${gameData["money"]}, decision_type = ${
        gameData["decisionType"]
      },
           inventory = '${JSON.stringify(gameData["inventory"])}',
           insured_crops = '${JSON.stringify(gameData["insuredCrops"])}',
           sell_prices = '${JSON.stringify(gameData["sellPrices"])}',
           consultant = '${gameData["consultant"]}'
           where user_id = '${userId}'`;
    } else {
      sql = `insert into GAMESTATE (user_id, turn, season, money, decision_type, inventory, insured_crops, sell_prices, consultant)
      values ('${userId}', ${gameData["turn"]}, '${gameData["season"]}', ${
        gameData["money"]
      }, ${gameData["decisionType"]}, '${JSON.stringify(
        gameData["inventory"]
      )}',
         '${JSON.stringify(gameData["insuredCrops"])}', '${JSON.stringify(
        gameData["sellPrices"]
      )}', '${gameData["consultant"]}')`;
    }

    database.query(sql, (err, result1) => {
      if (err) throw err;
      // console.log(result1);
    });
  });
};

const loadGame = (database, userId) => {
  let sql = `SELECT * FROM GAMESTATE WHERE user_id='${userId}'`;

  database.query(sql, (err, result) => {
    if (err) throw err;

    return_array = {};
    //transoforming the data to the type that will be used by the react states
    return_array.turn = result[0]["turn"];
    return_array.season = result[0]["season"];
    return_array.money = result[0]["money"];
    return_array.decisionType = Number(result[0]["decision_type"]);
    return_array.inventory = JSON.parse(result[0]["inventory"]);
    return_array.sellPrices = JSON.parse(result[0]["sell_prices"]);
    return_array.insuredCrops = JSON.parse(result[0]["insured_crops"]);
    return_array.consultant = result[0]["consultant"].split(",");

    return return_array;
  });
};

module.exports = {
  createUserTable,
  deleteUserTable,
  logData,
  saveGame,
  loadGame,
};
