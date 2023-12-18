import mssql from "mssql";
import dotenv from "dotenv";
dotenv.config();

export const sqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PWD as string,
  database: process.env.DB_NAME as string,
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function TestConnection() {
  const pool = await mssql.connect(sqlConfig);
  if (pool.connected) {
    console.log("connected to database on port 4500");
  } else {
    console.log("not connected");
  }
}

TestConnection();