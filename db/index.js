const { Pool } = require("pg");
const {
  user,
  host,
  database,
  password,
  port,
} = require("../secrets/db_configuration"); // Hide the config secrets so no one has unauth. access to it

// TODO configure database connection using Postgres pool
const pool = new Pool({ user, host, database, password, port });

module.exports = pool;
