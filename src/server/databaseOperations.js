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
    console.log(result);
  });
};

const saveGame = (database, userId) => {};

const loadGame = (database, userId) => {};

module.exports = {
  createUserTable,
  deleteUserTable,
  logData,
  saveGame,
  loadGame,
};
