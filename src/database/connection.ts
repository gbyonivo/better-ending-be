import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;
const DB_SCHEMA = process.env.DB_SCHEMA;
const DB_SSL = process.env.DB_SSL;

const connectionUrl =
  DB_SSL === "true"
    ? `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?ssl=${DB_SSL}`
    : `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelize = new Sequelize(connectionUrl, {
  logging: false,
  schema: DB_SCHEMA,
});

sequelize
  .authenticate()
  .then(() => {
    // Connection established
  })
  .catch((e) => {
    console.error(e);
  });

export { sequelize };
