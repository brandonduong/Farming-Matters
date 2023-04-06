/**
 * Executes an SQL query for a given database connection
 * @param {mysql.Connection} database An object representing the database to execute the command on.
 * @param {string} sql The SQL query to execute. 
 */
const runQuery = async (database, sql) => {
  let result;
  try {
    result = await database.query(sql);
  } catch (err) {
    console.log(`Error occured during query. Query: ${sql} \n Error: ${err}`);
  }

  return result;
};

/**
 * Creates an empty table for a new user.
 * @param {mysql.Connection} database An object representing the database to create the table in.
 * @param {string} userId The unique user ID corresponding to the table to be created. 
 */
const createUserTable = async (database, userId) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS LoggedActions_" +
    userId +
    " (action_id INT AUTO_INCREMENT NOT NULL, actionType MEDIUMTEXT NOT NULL, time DATETIME NOT NULL DEFAULT (NOW()), \
    turnNumber INT NOT NULL, season VARCHAR(6) NOT NULL, isExperimental BOOL NOT NULL, balance FLOAT NOT NULL, \
    details LONGTEXT, PRIMARY KEY (action_id))";

  return await runQuery(database, sql);
};

/**
 * Deletes a user's table.
 * @param {mysql.Connection} database An object representing the database to create the table in.
 * @param {string} userId The unique user ID corresponding to the table to be deleted. 
 */
const deleteUserTable = async (database, userId) => {
  let sql = "DROP TABLE LoggedActions_" + userId;

  return await runQuery(database, sql);
};

/**
 * Saves actions/reserach data for a user.
 * @param {mysql.Connection} database An object representing the database to create the table in.
 * @param {string} userId The user ID identifying the user to save the data for. 
 * @param {string} data The data to save in the user table.
 */
const logData = async (database, userId, data) => {
  let parsedData = JSON.parse(data);

  let sql =
    "INSERT INTO LoggedActions_" +
    userId +
    ` 
      (actionType, turnNumber, season, isExperimental, balance, details) 
      values 
      ('
        ${parsedData["actionType"]}',
        ${parsedData["turn"]}, 
        '${parsedData["season"]}',
        ${parsedData["isExperimental"]}, 
        ${parsedData["balance"]},
        '${JSON.stringify(parsedData["details"])}
      ')
    `;

  try {
    console.log("sql :", sql);
    await database.query(sql);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Save the game state for a user.
 * @param {mysql.Connection} database An object representing the database to create the table in.
 * @param {string} userId The user ID identifying the user to save the data for. 
 * @param {string} gameData The data for the game state to save.
 */
const saveGame = async (database, userId, gameData) => {
  let containsQuery = `SELECT * FROM GAMESTATE where user_id='${userId}'`;

  try {
    let result = await runQuery(database, containsQuery);
    let sql = "";

    // first element of result in the actual response to the query; other indices are information about schema and table
    if (result[0].length > 0) {
      sql = 
      `
        update GAMESTATE set 
          turn = ${gameData["turn"]}, 
          season = '${gameData["season"]}', 
          money = ${gameData["money"]}, 
          decision_type = ${gameData["decisionType"]},
          inventory = '${JSON.stringify(gameData["inventory"])}',
          insured_crops = '${JSON.stringify(gameData["insuredCrops"])}',
          sell_prices = '${JSON.stringify(gameData["sellPrices"])}',
          consultant = '${gameData["consultant"]}',
          farmGrid = '${gameData["farmGrid"]}'
        where user_id = '${userId}'
      `;
    } else {
      sql = 
      `
        insert into GAMESTATE (user_id, turn, season, money, decision_type, inventory, insured_crops, sell_prices, consultant, farmGrid)
        values 
        ('
          ${userId}', 
          ${gameData["turn"]}, 
          '${gameData["season"]}', 
          ${gameData["money"]},
          ${gameData["decisionType"]}, 
          '${JSON.stringify(gameData["inventory"])}',
          '${JSON.stringify(gameData["insuredCrops"])}', 
          '${JSON.stringify(gameData["sellPrices"])}',
          '${gameData["consultant"]}', 
          '${gameData["farmGrid"]}
        ')
      `;
    }

    return await runQuery(database, sql);

  } catch (err) {
    console.log(err);
  }
};

/**
 * Delete the game state for a user.
 * @param {mysql.Connection} database An object representing the database to create the table in.
 * @param {string} userId The user ID identifying the user to delete the data for. 
 */
const deleteGame = async (database, userId) => {
  let sql = `DELETE FROM GAMESTATE WHERE user_id='${userId}'`;

  return await runQuery(database, sql);
};

/**
 * Load the game state for a user.
 * @param {mysql.Connection} database An object representing the database to create the table in.
 * @param {string} userId The user ID identifying the user to load the data for. 
 */
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
  deleteGame,
};
