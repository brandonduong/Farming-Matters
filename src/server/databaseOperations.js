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

const loadGame = async (database, userId) => {
  let sql = `SELECT * FROM GAMESTATE WHERE user_id='${userId}'`;

  let result;
  try {
    result = await database.query(sql);
  } catch (err) {
    console.log(err);
  }

  return result;
};

module.exports = {
  createUserTable,
  deleteUserTable,
  logData,
  saveGame,
  loadGame,
};
