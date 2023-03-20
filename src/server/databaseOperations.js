const runQuery = async (database, sql) => {
  let result;
  try {
    result = await database.query(sql);
  } catch (err) {
    console.log(`Error occured during query. Query: ${sql} \n Error: ${err}`);
  }

  return result;
};

const createUserTable = async (database, userId) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS LoggedActions_" +
    userId +
    " (action_id INT AUTO_INCREMENT NOT NULL, actionType MEDIUMTEXT NOT NULL, time DATETIME NOT NULL DEFAULT (NOW()), \
    turnNumber INT NOT NULL, season VARCHAR(6) NOT NULL, isExperimental BOOL NOT NULL, balance FLOAT NOT NULL, \
    details LONGTEXT, PRIMARY KEY (action_id))";

  return await runQuery(database, sql);
};

const deleteUserTable = async (database, userId) => {
  let sql = "DROP TABLE LoggedActions_" + userId;

  return await runQuery(database, sql);
};

const logData = async (database, userId, data) => {
  let parsedData = JSON.parse(data);

  let sql =
    "INSERT INTO LoggedActions_" +
    userId +
    ` (actionType, turnNumber, season, isExperimental, balance, details) values ('${
      parsedData["actionType"]
    }', ${parsedData["turn"]}, \
    '${parsedData["season"]}', ${parsedData["isExperimental"]}, ${
      parsedData["balance"]
    }, '${JSON.stringify(parsedData["details"])}')`;
  try {
    console.log("sql :", sql);
    await database.query(sql);
  } catch (err) {
    console.log(err);
  }
};

// Update the code to use ? instead of putting in values directly in the string
const saveGame = async (database, userId, gameData) => {
  let containsQuery = `SELECT * FROM GAMESTATE where user_id='${userId}'`;

  try {
    let result = await runQuery(database, containsQuery);
    let sql = "";

    // first element of result in the actual response to the query; other indices are information about schema and table
    if (result[0].length > 0) {
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

    return await runQuery(database, sql);
  } catch (err) {
    console.log(err);
  }
};

const loadGame = async (database, userId) => {
  let sql = `SELECT * FROM GAMESTATE WHERE user_id='${userId}'`;

  return await runQuery(database, sql);
};

module.exports = {
  createUserTable,
  deleteUserTable,
  logData,
  saveGame,
  loadGame,
};
