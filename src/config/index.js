const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(process.cwd(), ".env") });

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 8080,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
};
