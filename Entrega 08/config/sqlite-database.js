const { db } = require("./index");
const knex = require("knex");

const sqlite = knex({
  client: "sqlite3",
  connection: {
    filename: "./database/ecommerce.sqlite",
  },
  useNullAsDefault: true,
});

class Database {
  static client;
  constructor() {
    if (Database.client) {
      return Database.client;
    }
    Database.client = sqlite;
    this.client = Database.client;
  }
}

module.exports = new Database().client;
