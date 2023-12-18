import ejs from "ejs";
import mssql from "mssql";
import dotenv from "dotenv";
import path from "path";
import { sqlConfig } from "../config/sqlComfig";
import { sendMail } from "../helpers/emailhelper";

export const welcomeUser = async () => {
  try {
    const pool = await mssql.connect(sqlConfig);

    const users = await (
      await pool.request().query("SELECT * FROM Users WHERE isWelcomed = 0")
    ).recordset;

    console.log(users);
    /**
     * the data is html
     */
    for (let individualuser of users) {
      ejs.renderFile(
        "templates/welcomeuser.ejs",
        { Name: individualuser.username },
        async (error, data) => {
          let mailOptions = {
            from: process.env.EMAIL as string,
            to: individualuser.email,
            subject: "Welcome Onboard",
            html: data,
          };

          try {
            await sendMail(mailOptions);

            /**
             * change state of receiving email
             */
            await pool
              .request()
              .query("UPDATE Users SET isWelcomed = 1 WHERE isWelcomed = 0");

            console.log("Emails send to new users");
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  } catch (error) {
    console.log("error is ", error);
  }
};